import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 1500, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>(0.5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;
