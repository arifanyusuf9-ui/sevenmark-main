import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 2400, suffix: "+", label: "Boxes Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 150, suffix: "+", label: "Corporate Clients" },
  { value: 14, suffix: "", label: "Countries Reached" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-gradient-gold font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

const StatsBar = () => {
  return (
    <section className="relative border-y border-border bg-muted py-20 sm:py-24 overflow-hidden">
      {/* Moving light streak */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(43 52% 54% / 0.05) 50%, transparent 100%)" }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      <div className="container mx-auto grid grid-cols-2 gap-8 px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <AnimatedNumber target={s.value} suffix={s.suffix} />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="mx-auto mt-3 mb-3 h-px bg-primary/40"
            />
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
