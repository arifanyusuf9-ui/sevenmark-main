import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = "Every signature deserves a ceremony. Every desk deserves a story.".split(" ");

const BrandStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="relative foil-texture py-20 sm:py-24 overflow-hidden">
      {/* Multiple shimmer streaks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(43 60% 70% / 0.12) 50%, transparent 100%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", repeatDelay: 3 + i * 2, delay: i * 1.5 }}
        />
      ))}

      <motion.div style={{ x }} className="relative text-center px-6">
        <p className="font-heading text-xl font-light italic tracking-wide text-primary-foreground sm:text-2xl lg:text-3xl">
          "
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          "
        </p>
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mx-auto mt-6 h-px w-32 bg-primary-foreground/20"
      />
    </section>
  );
};

export default BrandStrip;
