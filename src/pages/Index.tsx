import { useEffect, useRef, useState } from "react";
import logoWhite from "@/assets/logo-white.svg";
import { CreditCard, Shield, Smartphone, Wallet } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import smartwatchImg from "@/assets/smartwatch.png";
import bankCardImg from "@/assets/bank-card.png";
import prizesImg from "@/assets/prizes.png";
import heroBanner from "@/assets/hero-banner.jpg";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ShieldCheck, Star, Zap } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const services = [
  {
    image: smartwatchImg,
    title: "الساعة الذكية",
    description: "احصل على ساعتك الذكية مجاناً — عرض حصري ومحدود لعملاء CIB المميزين. سارع بالطلب الآن!",
    to: "/watches",
  },
  {
    image: bankCardImg,
    title: "تفعيل البطاقة",
    description: "فعّل بطاقتك البنكية في ثوانٍ واستمتع بتجربة دفع رقمية سلسة وآمنة بالكامل.",
    to: "/login",
  },
  {
    image: prizesImg,
    title: "الجائزة الكبرى",
    description: "اربح أجهزة إلكترونية وجوائز قيّمة عبر السحب الحصري لعملاء البنك التجاري الدولي.",
    to: "/login",
  },
];

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setWelcomeFading(true), 3700);
    const hideTimer = setTimeout(() => setShowWelcome(false), 4000);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrollY * 0.35}px) scale(${1 + scrollY * 0.0003})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Welcome Lightbox */}
      {showWelcome && (
        <div className={`fixed inset-0 z-[60] flex items-start justify-center pt-[40%] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${welcomeFading ? "opacity-0" : "opacity-100"}`}>
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/30"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${15 + (i * 11) % 70}%`,
                  animation: `floatParticle ${3 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          <div className={`relative mx-4 w-full max-w-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center transition-all duration-300 ${welcomeFading ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}>
            {/* Logo above card */}
            <div className="flex justify-center mb-[-30px] relative z-20">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-xl border-4 border-card" style={{ animation: "logoPulse 2s ease-in-out infinite" }}>
                  <img src={logoWhite} alt="CIB" className="h-auto w-14" />
                </div>
                <div className="absolute -inset-3 rounded-3xl bg-primary/20 blur-xl -z-10 animate-pulse" />
              </div>
            </div>
            <div className="rounded-3xl border border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-card" />
            <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.2), transparent 40%, hsl(var(--primary)/0.1) 60%, transparent)", animation: "gradientShift 4s ease-in-out infinite" }} />

            <div className="relative z-10 p-8 pt-14">
              <div className="space-y-3">
                <h2 className="text-2xl font-extrabold text-foreground animate-fade-in">مرحباً بك</h2>
                <p className="text-base text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "200ms" }}>
                  أهلاً بك في البنك التجاري الدولي<br />خدماتك المصرفية بين يديك
                </p>
              </div>

              {/* Decorative icons */}
              <div className="flex justify-center gap-4 mt-5 animate-fade-in" style={{ animationDelay: "400ms" }}>
                {[CreditCard, Shield, Smartphone, Wallet].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15"
                    style={{ animation: `iconBounce 2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-5 flex justify-center">
                <div className="h-1 w-28 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full hero-gradient" style={{ animation: "welcomeProgress 3.7s ease-out forwards" }} />
                </div>
              </div>
            </div>
            </div>
          </div>

          <style>{`
            @keyframes welcomeProgress { 0% { width: 0%; } 100% { width: 100%; } }
            @keyframes floatParticle {
              0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
              50% { transform: translateY(-20px) scale(1.5); opacity: 0.7; }
            }
            @keyframes logoPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes gradientShift {
              0%, 100% { opacity: 0.2; filter: hue-rotate(0deg); }
              50% { opacity: 0.4; filter: hue-rotate(15deg); }
            }
            @keyframes iconBounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
          `}</style>
        </div>
      )}
      
      <SiteHeader />

      <section ref={heroRef} className="relative overflow-hidden h-56 md:h-72">
        <img
          ref={imgRef}
          src={heroBanner}
          alt="البنك التجاري الدولي"
          className="absolute inset-0 w-full h-[130%] object-cover will-change-transform transition-none"
          width={1280}
          height={576}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/60" />
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] opacity-0 animate-fade-up">
              مرحباً بكم في خدماتنا المصرفية
            </h1>
            <p className="text-sm md:text-lg text-white/90 opacity-0 animate-fade-up drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ animationDelay: "150ms" }}>
              تجربة بنكية رقمية متكاملة بين يديك
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="relative flex items-center justify-center gap-3 sm:gap-8 py-3.5 bg-card/80 backdrop-blur-sm border-b border-border/50 flex-wrap px-2">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-6 h-6 rounded-lg hero-gradient flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-foreground">حماية <AnimatedCounter end={100} suffix="%" /></span>
        </div>
        <div className="w-px h-5 bg-border hidden sm:block" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-6 h-6 rounded-lg gradient-accent flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-foreground">+<AnimatedCounter end={2} /> مليون عميل</span>
        </div>
        <div className="w-px h-5 bg-border hidden sm:block" />
        <div className="flex items-center gap-1.5 relative z-10">
          <div className="w-6 h-6 rounded-lg hero-gradient flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-foreground">خدمة فورية <AnimatedCounter end={24} suffix="/7" /></span>
        </div>
      </div>

      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-2">اختر الخدمة المناسبة لك</h2>
            <p className="text-sm text-muted-foreground">خدمات مصرفية متنوعة مُصممة خصيصاً لراحتك</p>
            <div className="w-16 h-1 hero-gradient rounded-full mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                image={service.image}
                title={service.title}
                description={service.description}
                delay={200 + i * 150}
                to={service.to}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
