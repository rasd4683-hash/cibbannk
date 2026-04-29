import { ChevronLeft, ArrowUpLeft } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface WatchCardProps {
  id: string;
  name: string;
  image: string;
  color: string;
  accent: string;
  description: string;
  index: number;
  onSelect: (id: string) => void;
}

const WatchCard = ({ id, name, image, color, accent, description, index, onSelect }: WatchCardProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      onClick={() => onSelect(id)}
      className={`group relative bg-card rounded-2xl overflow-hidden cursor-pointer border border-border/50 card-shadow hover:card-hover-shadow transition-all duration-500 ease-out hover:-translate-y-2 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      }`}
      style={{ transitionDelay: isVisible ? `${100 + index * 80}ms` : "0ms" }}
    >
      {/* Color accent */}
      <div className={`absolute top-3 right-3 w-3.5 h-3.5 rounded-full ${accent} z-10 ring-2 ring-card shadow-md`} />

      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Image */}
      <div className="relative flex items-center justify-center p-5 md:p-7 bg-gradient-to-br from-muted/60 via-secondary/30 to-muted/40 overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,hsl(213_76%_44%/0.08),transparent_60%)]" />
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={200}
          height={200}
          className="w-28 h-28 md:w-36 md:h-36 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-out drop-shadow-xl relative z-10"
        />
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      {/* Content */}
      <div className="relative p-3 md:p-4 text-center space-y-1.5">
        <h3 className="text-sm md:text-base font-extrabold text-foreground">{name}</h3>
        <p className="text-muted-foreground text-[11px] leading-relaxed hidden md:block">{description}</p>
        <div className="inline-flex items-center gap-1 hero-gradient text-primary-foreground text-[10px] md:text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-button group-hover:shadow-[0_6px_20px_hsl(213_76%_44%/0.35)] transition-all duration-300">
          <span>اطلب الآن</span>
          <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Corner arrow */}
      <div className="absolute top-3 left-3 w-7 h-7 rounded-full glass-card flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
        <ArrowUpLeft className="w-3 h-3 text-primary" />
      </div>
    </div>
  );
};

export default WatchCard;
