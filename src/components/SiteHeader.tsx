import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import logo from "@/assets/logo-white.svg";

const HIDE_BACK_ON = ["/", "/waiting", "/dashboard", "/login", "/success"];

const SiteHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = !HIDE_BACK_ON.includes(location.pathname);

  return (
    <header className="hero-gradient py-3.5 px-4 shadow-[0_2px_20px_hsl(213_76%_44%/0.3)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,hsl(250_60%_50%/0.3),transparent_60%)]" />
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <img src={logo} alt="CIB" className="h-9 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            aria-label="رجوع"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-primary-foreground text-xs font-bold transition-all hover:-translate-x-0.5"
          >
            <ChevronRight className="w-4 h-4" />
            رجوع
          </button>
        ) : (
          <span className="w-[68px]" aria-hidden />
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
