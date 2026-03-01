import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CraftStorySection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -20]);

  return (
    <section id="about" ref={ref} className="relative bg-background py-24 sm:py-32 overflow-hidden">
      {/* Ambient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video / Visual */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -50, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-sm"
          >
            <video
              autoPlay muted loop playsInline
              className="h-full w-full object-cover"
              preload="metadata"
            >
              <source src="/assets/hero.mp4" type="video/mp4" />
            </video>
            {/* Decorative frame */}
            <div className="absolute inset-0 border border-primary/20 rounded-sm pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 h-20 w-20 border-b border-r border-primary/30" />
            <div className="absolute -top-2 -left-2 h-20 w-20 border-t border-l border-primary/30" />
          </motion.div>

          {/* Copy */}
          <motion.div style={{ y: textY }}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 block font-body text-xs uppercase tracking-[0.3em] text-primary"
            >
              Our philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl"
            >
              Behind the <span className="text-gradient-gold">Craft</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 font-heading text-xl font-light italic text-muted-foreground"
            >
              "Each box takes 14 hours to craft. We don't rush legacy."
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 font-body text-sm leading-relaxed text-muted-foreground"
            >
              From selecting the finest hardwoods to precision laser engraving, every SevenMark box
              is a testament to patience, skill, and an unwavering pursuit of perfection. Our master
              artisans bring decades of expertise to each piece, ensuring that what you hold in your
              hands is not merely a box — but a legacy.
            </motion.p>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-gold-light"
            >
              Our Story
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CraftStorySection;
