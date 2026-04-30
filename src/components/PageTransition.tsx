import { ReactNode, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ShieldCheck, Sparkles, Lock } from "lucide-react";

const LOADING_MESSAGES = [
  { text: "جاري تأمين الاتصال", icon: Lock },
  { text: "تحميل الصفحة بأمان", icon: ShieldCheck },
  { text: "تحضير محتواك", icon: Sparkles },
];

// Routes that should NEVER show the transition overlay (heavy/admin pages).
const SKIP_TRANSITION = new Set<string>(["/", "/dashboard"]);

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const prevKey = useRef(location.key);

  useEffect(() => {
    if (location.key === prevKey.current) return;
    prevKey.current = location.key;

    if (SKIP_TRANSITION.has(location.pathname)) {
      setShowOverlay(false);
      return;
    }

    setShowOverlay(true);
    setMsgIndex(0);

    const msgTimer = window.setInterval(() => {
      setMsgIndex((p) => (p + 1) % LOADING_MESSAGES.length);
    }, 500);

    const hideTimer = window.setTimeout(() => {
      setShowOverlay(false);
    }, 1200);

    return () => {
      window.clearInterval(msgTimer);
      window.clearTimeout(hideTimer);
    };
  }, [location.key, location.pathname]);

  const ActiveIcon = LOADING_MESSAGES[msgIndex].icon;

  return (
    <>
      {/* Children are ALWAYS rendered — this prevents the white-screen bug
          that happened when displayChildren was held back during the
          transition window. The overlay simply sits on top while loading. */}
      {children}

      {showOverlay && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-background via-card to-background overflow-hidden"
          dir="rtl"
        >
          <div className="absolute top-1/4 -left-20 w-72 h-72 orb orb-primary opacity-30 animate-orb-float pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 orb orb-purple opacity-25 animate-orb-float-delay pointer-events-none" />
          <div className="absolute inset-0 pattern-grid opacity-[0.07] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6 animate-scale-in">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" style={{ animationDuration: "1.5s" }} />
              <div className="absolute inset-3 rounded-full border-2 border-accent/15 border-b-accent animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
              <div className="relative w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center shadow-[0_10px_40px_hsl(213_76%_44%/0.45)] overflow-hidden">
                <span className="text-2xl font-black text-white tracking-tight relative z-10 drop-shadow-md">CIB</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-md min-w-[200px] justify-center">
              <ActiveIcon className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span key={msgIndex} className="text-xs font-bold text-foreground">
                {LOADING_MESSAGES[msgIndex].text}
              </span>
            </div>

            <div className="flex items-center gap-1.5 opacity-70">
              <Lock className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider">
                اتصال مشفّر بمعيار SSL 256-bit
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageTransition;
