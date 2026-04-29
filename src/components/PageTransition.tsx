import { ReactNode, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"idle" | "loading" | "entering">("idle");
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

      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setStage("entering");

        const enterTimer = setTimeout(() => setStage("idle"), 500);
        return () => clearTimeout(enterTimer);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [location.key, location.pathname, children]);

  return (
    <>
      {stage === "loading" && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/8 blur-3xl animate-pulse [animation-delay:500ms]" />
          </div>

          <div className="relative flex flex-col items-center gap-6 animate-scale-in">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-2 border-primary/20 flex items-center justify-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  style={{ animation: "shimmer 1.5s ease-in-out infinite" }}
                />
                <span className="text-3xl font-black text-primary tracking-tight relative z-10">CIB</span>
              </div>
              <div className="absolute -inset-2 rounded-3xl bg-primary/10 blur-xl -z-10 animate-pulse" />
            </div>

            <div className="w-32 h-1 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                style={{ animation: "progress 1500ms ease-out forwards" }}
              />
            </div>

            <p className="text-xs text-muted-foreground font-medium tracking-wider">جاري التحميل</p>
          </div>

          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}

      <div
        className={`transition-all duration-400 ease-out ${
          stage === "entering"
            ? "opacity-100 translate-y-0 scale-100"
            : stage === "loading"
            ? "opacity-0 scale-[0.98]"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition;
