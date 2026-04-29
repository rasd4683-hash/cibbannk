import { useEffect, useState, useRef } from "react";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";

const motivationalMessages = [
  "أمانك المصرفي في أيدٍ أمينة 🔒",
  "نعمل على تجهيز تجربتك المميزة ✨",
  "خطوة واحدة تفصلك عن عالم من المزايا 🚀",
  "نحرص على أعلى معايير الأمان لحمايتك 🛡️",
  "بياناتك مشفرة ومحمية بالكامل 🔐",
  "قريباً ستستمتع بأحدث التقنيات المصرفية 📱",
];

const WaitingOverlay = () => {
  const [elapsed, setElapsed] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const startTime = useRef(Date.now());

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md" dir="rtl">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 orb orb-primary opacity-30 animate-orb-float pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 orb orb-purple opacity-25 animate-orb-float-delay pointer-events-none" />

      {/* Shimmer particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/60"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animation: `shimmerWait ${2 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.2) % 3}s`,
              boxShadow: "0 0 8px hsl(var(--accent))",
            }}
          />
        ))}
      </div>

      <div className="relative mx-4 max-w-sm w-full animate-fade-in">
        {/* Outer gradient border */}
        <div className="relative rounded-3xl overflow-hidden p-[1.5px] hero-gradient shadow-[0_20px_70px_rgba(0,0,0,0.5)]">
          <div className="relative rounded-3xl overflow-hidden bg-card text-center">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.2), transparent 40%, hsl(var(--accent)/0.15) 70%, transparent)", backgroundSize: "200% 200%", animation: "gradientShiftWait 4s ease-in-out infinite" }} />
            <div className="absolute inset-0 pattern-grid opacity-10" />
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />

            <div className="relative z-10 p-6">
              {/* Spinner */}
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-2 hero-gradient rounded-full opacity-20 blur-md" />
                  {/* Orbiting dot */}
                  <div className="absolute inset-0" style={{ animation: "orbitWait 2.5s linear infinite" }}>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold text-primary">قيد المعالجة</span>
              </div>

              <h2 className="text-lg font-black text-foreground mb-1.5">
                يرجى{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "shineWait 3s linear infinite" }}>
                  الانتظار
                </span>
              </h2>
              <p className="text-muted-foreground text-xs leading-relaxed">
                جاري مراجعة بياناتك من قبل فريقنا المختص. يرجى عدم إغلاق هذه الصفحة.
              </p>

              {/* Timer */}
              <div className="mt-3 flex items-center justify-center gap-2 bg-muted/40 rounded-xl py-2.5 px-4 border border-border/30">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground font-mono" dir="ltr">
                  {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-muted-foreground">وقت الانتظار</span>
              </div>

              {/* Motivational */}
              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary/5 to-accent/10 rounded-xl py-2.5 px-3 border border-primary/10">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs font-semibold text-foreground transition-all duration-500">
                    {motivationalMessages[currentMessage]}
                  </p>
                </div>
              </div>

              {/* Security badge */}
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">بياناتك محمية بتشفير 256-bit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmerWait { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes shineWait { to { background-position: 200% center; } }
        @keyframes gradientShiftWait { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes orbitWait { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default WaitingOverlay;
