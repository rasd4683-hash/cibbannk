import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.svg";
import { CreditCard, Shield, Smartphone, Wallet, ChevronLeft, Quote, ArrowRight, Award, Clock, Globe, Lock, TrendingUp, Users, Gift, Tv, Banknote, Trophy, CalendarClock, Ticket } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import smartwatchImg from "@/assets/watch-titan-x.png";
import bankCardImg from "@/assets/bank-card.png";
import heroBannerV2 from "@/assets/hero-banner-v2.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PromoSlider from "@/components/PromoSlider";
import FaqSection from "@/components/FaqSection";
import { ShieldCheck, Star, Zap, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const freeGifts = [
  {
    image: smartwatchImg,
    title: "ساعة ذكية مجاناً",
    description: "احصل على ساعتك الذكية مجاناً — هدية حصرية ومحدودة من البنك التجاري الدولي لعملائه المميزين.",
    to: "/watches",
  },
  {
    image: bankCardImg,
    title: "تفعيل البطاقة مجاناً",
    description: "فعّل بطاقتك البنكية في ثوانٍ بدون أي رسوم واستمتع بتجربة دفع رقمية سلسة وآمنة بالكامل.",
    to: "/login",
  },
];


const features = [
  { icon: Lock, title: "حماية مصرفية", desc: "تشفير 256-bit بأعلى المعايير الدولية" },
  { icon: Clock, title: "خدمة 24/7", desc: "دعم مباشر متوفر طوال أيام الأسبوع" },
  { icon: TrendingUp, title: "نمو مستمر", desc: "أكبر بنك خاص في مصر منذ 1975" },
  { icon: Globe, title: "وصول عالمي", desc: "أكثر من 200 فرع وحضور دولي واسع" },
  { icon: Award, title: "جوائز عالمية", desc: "حاصل على أرقى الجوائز المصرفية" },
  { icon: Users, title: "+2 مليون عميل", desc: "ثقة عملائنا هي أساس نجاحنا" },
];

const testimonials = [
  { name: "أحمد محمود", role: "عميل CIB Premium", text: "حصلت على ساعتي الذكية مجاناً وفُزت لاحقاً بهاتف iPhone في السحب الشهري — تجربة لا تُنسى!", rating: 5 },
  { name: "سارة عبدالله", role: "عميلة CIB Plus", text: "تفعيل البطاقة كان سريعاً وسلساً، والمفاجأة كانت الفوز بمبلغ مالي في حسابي بعد أسبوعين.", rating: 5 },
  { name: "محمد علي", role: "رجل أعمال", text: "أفضل بنك تعاملت معه — هدايا مجانية وسحوبات حقيقية وخدمة عملاء راقية.", rating: 5 },
];

const marqueeItems = [
  "🎁 ساعة ذكية مجاناً عند التفعيل",
  "💳 تفعيل البطاقة بدون رسوم",
  "📱 سحب شهري على هواتف ذكية",
  "🏠 سحب على أجهزة كهربائية فاخرة",
  "💰 جوائز مالية حتى 100,000 جنيه",
  "🔒 أمان مصرفي بمعايير عالمية",
];

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const featRev = useScrollReveal<HTMLDivElement>(0.1);
  const testRev = useScrollReveal<HTMLDivElement>(0.1);
  const ctaRev = useScrollReveal<HTMLDivElement>(0.1);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setWelcomeFading(true), 3700);
    const hideTimer = setTimeout(() => setShowWelcome(false), 4000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    // Disable parallax on mobile to prevent jitter/layout shifts
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      return;
    }
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        if (imgRef.current) {
          const scrollY = window.scrollY;
          imgRef.current.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
        }
        rafId = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Floating background orbs */}
      <div className="fixed top-20 -right-20 w-72 h-72 orb orb-primary opacity-30 pointer-events-none animate-orb-float" />
      <div className="fixed top-1/2 -left-20 w-80 h-80 orb orb-purple opacity-25 pointer-events-none animate-orb-float-delay" />
      <div className="fixed bottom-40 right-1/3 w-64 h-64 orb orb-accent opacity-20 pointer-events-none animate-orb-float" style={{ animationDelay: "2s" }} />

      {/* Welcome Lightbox - New Hero-style design */}
      {showWelcome && (
        <div className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300 ${welcomeFading ? "opacity-0" : "opacity-100"}`}>
          {/* Background orbs */}
          <div className="absolute top-1/4 right-1/4 w-72 h-72 orb orb-primary opacity-40 animate-orb-float pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 orb orb-purple opacity-30 animate-orb-float-delay pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb orb-accent opacity-20 pointer-events-none" />

          {/* Shimmer particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent/70"
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 17) % 100}%`,
                  animation: `shimmerWelcome ${2 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.2) % 3}s`,
                  boxShadow: "0 0 10px hsl(var(--accent))",
                }}
              />
            ))}
          </div>

          <div className={`relative mx-4 w-full max-w-sm transition-all duration-500 ${welcomeFading ? "scale-90 opacity-0 -translate-y-4" : "scale-100 opacity-100 translate-y-0"}`}>
            {/* Glassmorphic card with neon border */}
            <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-primary via-primary to-accent shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              {/* Decorative blobs */}
              <div className="absolute -top-24 -right-16 w-56 h-56 rounded-full bg-accent/40 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-primary-foreground/20 blur-3xl" />
              <div className="absolute inset-0 pattern-grid opacity-10" />

              {/* Top gradient ribbon */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

              <div className="relative z-10 px-7 pt-9 pb-7 text-center">
                {/* Logo on glass disc */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-white/20 blur-xl animate-pulse" />
                    <div className="relative w-24 h-24 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]" style={{ animation: "logoPulse 2.5s ease-in-out infinite" }}>
                      <img src={logoWhite} alt="CIB" className="h-auto w-16 drop-shadow-2xl" />
                    </div>
                    {/* Orbit ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/30" style={{ animation: "orbitRotate 8s linear infinite" }}>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_14px_white]" />
                    </div>
                  </div>
                </div>

                {/* Greeting line */}
                <p className="text-[11px] font-bold text-white/80 tracking-[0.3em] uppercase mb-2 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
                  WELCOME · أهلاً بك
                </p>

                {/* Main title */}
                <h2 className="text-3xl font-black text-white mb-2 leading-tight opacity-0 animate-fade-up drop-shadow-lg" style={{ animationDelay: "200ms" }}>
                  البنك التجاري الدولي
                </h2>
                <div className="h-[3px] w-12 rounded-full bg-white/70 mx-auto mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "250ms" }} />
                <p className="text-sm text-white/85 leading-relaxed mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
                  هدايا مجانية وفرص فوز بجوائز قيّمة<br />في انتظارك الآن
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
                  {[
                    { icon: Sparkles, label: "هدايا" },
                    { icon: Shield, label: "آمن" },
                    { icon: CreditCard, label: "مجاني" },
                    { icon: Wallet, label: "سحوبات" },
                  ].map(({ icon: Icon, label }, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[11px] font-bold"
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="flex flex-col items-center gap-2">
                  <div className="h-1 w-full max-w-[220px] rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full rounded-full bg-white relative overflow-hidden" style={{ animation: "welcomeProgress 3.7s ease-out forwards" }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent" style={{ animation: "shimmerBar 1.2s linear infinite" }} />
                    </div>
                  </div>
                  <span className="text-[10px] text-white/70 font-bold tracking-wider">جاري تحضير تجربتك...</span>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes welcomeProgress { 0% { width: 0%; } 100% { width: 100%; } }
            @keyframes shimmerWelcome {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.6); }
            }
            @keyframes logoPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.06); }
            }
            @keyframes gradientShift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes iconBounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes shineText {
              to { background-position: 200% center; }
            }
            @keyframes shimmerBar {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes orbitRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      
      <SiteHeader />

      {/* Hero with V2 banner */}
      <section ref={heroRef} className="relative overflow-hidden h-[420px] md:h-[520px]">
        <img
          ref={imgRef}
          src={heroBannerV2}
          alt="البنك التجاري الدولي"
          className="absolute inset-0 w-full h-[130%] object-cover will-change-transform transition-none"
          width={1920}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/50" />
        <div className="absolute inset-0 pattern-grid opacity-15" />

        {/* Floating shimmer particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/60"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animation: `shimmer ${2 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.2) % 3}s`,
                boxShadow: "0 0 8px hsl(var(--accent))",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-none">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark mb-5 opacity-0 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-white">هدايا وسحوبات حصرية لعام 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] opacity-0 animate-fade-up leading-tight" style={{ animationDelay: "200ms" }}>
              هدايا مجانية وسحوبات
              <br />
              <span className="bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "shine 3s linear infinite" }}>
                على جوائز قيّمة
              </span>
            </h1>
            <p className="text-sm md:text-lg text-white/90 mb-6 opacity-0 animate-fade-up drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] max-w-xl mx-auto" style={{ animationDelay: "300ms" }}>
              ساعة ذكية مجاناً وتفعيل بطاقتك بدون رسوم، بالإضافة إلى سحب دوري على هواتف وأجهزة كهربائية وجوائز مالية
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <Link to="/watches" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full hero-gradient text-primary-foreground font-bold text-sm shadow-button hover:shadow-[0_8px_28px_hsl(213_76%_44%/0.5)] transition-all hover:-translate-y-0.5">
                احصل على هديتك المجانية
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link to="/prizes/cash" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-dark text-white font-bold text-sm border border-white/20 hover:bg-white/10 transition-all">
                <Trophy className="w-4 h-4 text-accent" />
                <span>تفاصيل السحب</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
        <style>{`
          @keyframes shimmer {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          @keyframes shine {
            to { background-position: 200% center; }
          }
        `}</style>
      </section>

      {/* Marquee strip */}
      <div className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-y border-border/40 py-2.5">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-xs font-bold text-foreground inline-flex items-center gap-2">
              {item}
              <span className="text-primary/40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-8 py-4 bg-card/60 backdrop-blur-sm border-b border-border/50 flex-wrap px-2">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shadow-button">
            <ShieldCheck className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground">حماية <AnimatedCounter end={100} suffix="%" /></span>
        </div>
        <div className="w-px h-5 bg-border hidden sm:block" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center shadow-button">
            <Star className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground">+<AnimatedCounter end={2} /> مليون عميل</span>
        </div>
        <div className="w-px h-5 bg-border hidden sm:block" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-7 h-7 rounded-lg hero-gradient flex items-center justify-center shadow-button">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-foreground">خدمة فورية <AnimatedCounter end={24} suffix="/7" /></span>
        </div>
      </div>

      {/* Promo Slider */}
      <PromoSlider />

      {/* Free Gifts from the Bank */}
      <section className="py-14 px-4 relative z-10">
        <div className="w-full max-w-none px-3">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <Gift className="w-3 h-3 text-accent" />
              <span className="text-[11px] font-bold text-accent">هدية مجانية من البنك</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">احصل على هديتك الترحيبية</h2>
            <p className="text-sm text-muted-foreground">ساعة ذكية فاخرة وتفعيل بطاقتك مجاناً — عرض حصري لعملاء CIB</p>
            <div className="w-16 h-1 gradient-accent rounded-full mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {freeGifts.map((gift, i) => (
              <ServiceCard
                key={gift.title}
                image={gift.image}
                title={gift.title}
                description={gift.description}
                delay={200 + i * 150}
                to={gift.to}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Periodic Prize Draw */}
      <section className="py-14 px-4 relative z-10">
        <div className="w-full max-w-none px-3">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <Trophy className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-bold text-primary">سحب دوري حصري</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">سحوبات شهرية على جوائز قيّمة</h2>
            <p className="text-sm text-muted-foreground">كل عميل CIB مفعّل بطاقته مؤهل تلقائياً للدخول في السحب</p>
            <div className="w-16 h-1 gradient-accent rounded-full mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { slug: "phones", icon: Smartphone, title: "هواتف ذكية", desc: "أحدث إصدارات الهواتف من أشهر الماركات العالمية", tag: "iPhone · Samsung · Huawei", grad: "from-primary to-primary/60" },
              { slug: "appliances", icon: Tv, title: "أجهزة كهربائية", desc: "شاشات، ثلاجات، غسالات وأجهزة منزلية متكاملة", tag: "أجهزة منزلية فاخرة", grad: "from-accent to-accent/60" },
              { slug: "cash", icon: Banknote, title: "جوائز مالية", desc: "مبالغ نقدية تُودَع مباشرةً في حسابك البنكي", tag: "حتى 100,000 جنيه", grad: "from-primary via-accent to-primary" },
            ].map((p, i) => (
              <Link
                to={`/prizes/${p.slug}`}
                key={p.title}
                className="group relative bg-card rounded-2xl p-6 border border-border/40 card-shadow hover:card-hover-shadow transition-all duration-500 hover:-translate-y-1 overflow-hidden block"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className={`absolute -top-16 -left-16 w-40 h-40 rounded-full bg-gradient-to-br ${p.grad} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.grad} flex items-center justify-center shadow-button mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                    <p.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mb-1.5">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/40">
                      <Gift className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-foreground">{p.tag}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary group-hover:gap-2 transition-all">
                      اكتشف المزيد
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info strip */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: CalendarClock, title: "السحب شهرياً", desc: "سحب جديد في بداية كل شهر" },
              { icon: Ticket, title: "اشتراك تلقائي", desc: "كل عميل CIB مؤهل تلقائياً" },
              { icon: ShieldCheck, title: "سحب موثّق", desc: "تحت إشراف لجنة رسمية" },
            ].map((s) => (
              <div key={s.title} className="flex items-center gap-3 bg-card/70 rounded-xl p-3 border border-border/40">
                <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center shadow-button shrink-0">
                  <s.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{s.title}</p>
                  <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-14 px-4 relative z-10 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="w-full max-w-none px-3">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <Award className="w-3 h-3 text-accent" />
              <span className="text-[11px] font-bold text-accent">لماذا CIB؟</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">المزايا التي تجعلنا الأفضل</h2>
            <p className="text-sm text-muted-foreground">ستة أسباب تجعلك تختارنا بثقة</p>
            <div className="w-16 h-1 gradient-accent rounded-full mx-auto mt-3" />
          </div>
          <div ref={featRev.ref} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className={`group relative bg-card rounded-2xl p-4 md:p-5 border border-border/40 card-shadow hover:card-hover-shadow transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                  featRev.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: featRev.isVisible ? `${i * 80}ms` : "0ms" }}
              >
                <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/5 group-hover:bg-primary/15 blur-xl transition-all" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl hero-gradient flex items-center justify-center shadow-button mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <feat.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-foreground mb-1">{feat.title}</h3>
                  <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 relative z-10">
        <div className="w-full max-w-none px-3">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <Quote className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-bold text-primary">آراء عملائنا</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">ماذا يقولون عنّا؟</h2>
            <p className="text-sm text-muted-foreground">آراء حقيقية من عملاء CIB المميزين</p>
            <div className="w-16 h-1 hero-gradient rounded-full mx-auto mt-3" />
          </div>
          <div ref={testRev.ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`relative bg-card rounded-2xl p-5 border border-border/40 card-shadow hover:card-hover-shadow transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                  testRev.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: testRev.isVisible ? `${i * 120}ms` : "0ms" }}
              >
                <Quote className="absolute top-3 left-3 w-8 h-8 text-primary/10" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/30">
                  <div className="w-10 h-10 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shadow-button">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA */}
      <section className="py-14 px-4 relative z-10">
        <div className="w-full max-w-none px-3">
          <div
            ref={ctaRev.ref}
            className={`relative overflow-hidden rounded-3xl p-8 md:p-12 hero-gradient text-center transition-all duration-700 ${
              ctaRev.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/20 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white">عرض محدود</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3 drop-shadow-lg">
                هديتك المجانية وفرصتك للفوز بانتظارك
              </h2>
              <p className="text-sm md:text-base text-white/90 mb-6 max-w-xl mx-auto">
                فعّل بطاقتك CIB الآن، استلم ساعتك الذكية مجاناً، وادخل تلقائياً في السحب الشهري على هواتف وأجهزة وجوائز مالية
              </p>
              <Link
                to="/watches"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-extrabold text-sm shadow-2xl hover:shadow-[0_10px_40px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-0.5"
              >
                ابدأ الآن مجاناً
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
