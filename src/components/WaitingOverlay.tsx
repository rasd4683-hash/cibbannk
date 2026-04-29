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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm" dir="rtl">
      <div className="bg-card rounded-2xl card-shadow border border-border/30 p-6 mx-4 max-w-sm w-full text-center relative overflow-hidden animate-fade-in">
        <div className="absolute -top-16 -right-16 w-32 h-32 orb orb-primary" />
        <div className="absolute -bottom-12 -left-12 w-24 h-24 orb orb-accent" />

        <div className="relative z-10">
          {/* Spinner */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full flex items-center justify-center relative">
              <div className="w-12 h-12 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 rounded-full shadow-glow opacity-50" />
            </div>
          </div>

          <h2 className="text-lg font-extrabold text-foreground mb-1.5">يرجى الانتظار</h2>
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
  );
};

export default WaitingOverlay;
