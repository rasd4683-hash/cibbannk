import logo from "@/assets/logo-white.svg";

const SiteFooter = () => (
  <footer className="hero-gradient border-t border-primary-foreground/10 py-6 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(250_60%_50%/0.2),transparent_60%)]" />
    <div className="container mx-auto flex flex-col items-center gap-2.5 relative z-10">
      <img src={logo} alt="CIB" className="h-6 opacity-80" />
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
      <p className="text-primary-foreground/50 text-[10px]">
        © {new Date().getFullYear()} البنك التجاري الدولي — جميع الحقوق محفوظة
      </p>
    </div>
  </footer>
);

export default SiteFooter;
