import { Link } from "react-router-dom";
import { ChevronLeft, ArrowUpLeft } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  delay: number;
  to: string;
}

const ServiceCard = ({ image, title, description, delay, to }: ServiceCardProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>(0.1);

  return (
    <Link
      ref={ref}
      to={to}
      className={`group block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-primary/10 hover:border-primary/30 bg-card ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 z-20">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary/80 transition-colors duration-300">
            <ArrowUpLeft className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 z-20 p-4">
          <h3 className="text-xl font-bold text-white drop-shadow-lg">{title}</h3>
        </div>
      </div>

      <div className="p-4 relative">
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {description}
        </p>
        <div className="flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
          <span>اكتشف المزيد</span>
          <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
