import { ReactNode, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ShieldCheck, Sparkles, Lock } from "lucide-react";

const LOADING_MESSAGES = [
  { text: "جاري تأمين الاتصال", icon: Lock },
  { text: "تحميل الصفحة بأمان", icon: ShieldCheck },
  { text: "تحضير محتواك", icon: Sparkles },
];

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"idle" | "loading" | "entering">("idle");
  const [msgIndex, setMsgIndex] = useState(0);
  const prevKey = useRef(location.key);

  useEffect(() => {
    if (location.key !== prevKey.current) {
      prevKey.current = location.key;

      if (location.pathname === "/") {
        setDisplayChildren(children);
        setStage("idle");
        return;
      }

      setStage("loading");
      setMsgIndex(0);

      // Rotate messages while loading
      const msgTimer = window.setInterval(() => {
        setMsgIndex((p) => (p + 1) % LOADING_MESSAGES.length);
      }, 500);

      const timer = setTimeout(() => {
        window.clearInterval(msgTimer);
        setDisplayChildren(children);
        setStage("entering");

        const enterTimer = setTimeout(() => setStage("idle"), 500);
        return () => clearTimeout(enterTimer);
      }, 1500);

      return () => {
        clearTimeout(timer);
        window.clearInterval(msgTimer);
      };
    } else {
      setDisplayChildren(children);
    }
  }, [location.key, location.pathname, children]);

  const ActiveIcon = LOADING_MESSAGES[msgIndex].icon;

  return (
    <>
      {stage === "loading" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-background via-card to-background overflow-hidden"
          dir="rtl"
        >
          {/* Floating orbs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 orb orb-primary opacity-30 animate-orb-float pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 orb orb-purple opacity-25 animate-orb-float-delay pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-56 h-56 orb orb-accent opacity-20 animate-orb-float pointer-events-none" style={{ animationDelay: "2s" }} />

          {/* Grid pattern */}
          <div className="absolute inset-0 pattern-grid opacity-[0.07] pointer-events-none" />

          {/* Shimmer particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/60"
                style={{
                  left: `${(i * 17 + 5) % 100}%`,
                  top: `${(i * 23 + 8) % 100}%`,
                  animation: `ptShimmer ${1.5 + (i % 4) * 0.5}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.15) % 2}s`,
                  boxShadow: "0 0 10px hsl(var(--primary))",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-6 animate-scale-in">
            {/* Logo with orbiting rings */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" style={{ animationDuration: "1.5s" }} />
              {/* Middle ring (reverse) */}
              <div className="absolute inset-3 rounded-full border-2 border-accent/15 border-b-accent animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
              {/* Inner pulsing glow */}
              <div className="absolute inset-6 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 blur-md animate-pulse" />

              {/* Logo box */}
              <div className="relative w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-[0_10px_40px_hsl(213_76%_44%/0.45)] overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ animation: "ptShimmerLogo 1.5s ease-in-out infinite" }}
                />
                <span className="text-2xl font-black text-white tracking-tight relative z-10 drop-shadow-md">CIB</span>
              </div>

              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              </div>
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-md min-w-[200px] justify-center">
              <ActiveIcon className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span
                key={msgIndex}
                className="text-xs font-bold text-foreground"
                style={{ animation: "ptFadeIn 0.3s ease-out" }}
              >
                {LOADING_MESSAGES[msgIndex].text}
              </span>
              <span className="flex gap-0.5">
                <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>

            {/* Progress bar with glow */}
            <div className="relative w-56">
              <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden border border-border/30">
                <div
                  className="h-full rounded-full hero-gradient relative"
                  style={{ animation: "ptProgress 1500ms ease-out forwards" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: "ptProgressShine 1s linear infinite" }} />
                </div>
              </div>
              {/* Progress glow */}
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md -z-10" />
            </div>

            {/* Security note */}
            <div className="flex items-center gap-1.5 opacity-70">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider">
                اتصال مشفّر بمعيار SSL 256-bit
              </span>
            </div>
          </div>

          <style>{`
            @keyframes ptShimmer {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.6); }
            }
            @keyframes ptShimmerLogo {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes ptProgress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            @keyframes ptProgressShine {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes ptFadeIn {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}

      <div
        className={`transition-opacity duration-300 ease-out ${
          stage === "loading" ? "opacity-0" : "opacity-100"
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition;
