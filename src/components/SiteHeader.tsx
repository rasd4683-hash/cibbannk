import logo from "@/assets/logo-white.svg";

const SiteHeader = () => (
  <header className="hero-gradient py-3.5 px-6 shadow-[0_2px_20px_hsl(213_76%_44%/0.3)] relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,hsl(250_60%_50%/0.3),transparent_60%)]" />
    <div className="container mx-auto flex items-center justify-start relative z-10">
      <img src={logo} alt="CIB" className="h-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
    </div>
  </header>
);

export default SiteHeader;
