import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { AntiGravityCanvas } from "./AntiGravityCanvas";

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: 0.5 + i * 0.06, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
  }),
};

const AnimatedText = ({ text, className }: { text: string; className?: string }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The total duration is 800vh. The animation finishes at 90% progress, giving a 10% hold on the final frame.
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]); // Fades out by the time the box opens
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const blur = useTransform(scrollYProgress, [0.75, 0.9], [0, 8]);

  return (
    <section ref={ref} className="relative h-[800vh] w-full">
      {/* 600vh scroll container, content stays sticky inside */}

      {/* AntiGravity Canvas handles its own stickiness and z-index internally */}
      <AntiGravityCanvas />

      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Multi-layer overlays */}
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply" style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 4% / 0.9) 100%)" }} />

        {/* Animated geometric grid */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-primary/30"
              style={{ top: `${12.5 * (i + 1)}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 1 + i * 0.1, ease: "easeOut" }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-primary/30"
              style={{ left: `${12.5 * (i + 1)}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 1.5 + i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 4}px`,
                height: `${1 + Math.random() * 4}px`,
                background: `hsl(43 52% ${40 + Math.random() * 30}% / ${0.15 + Math.random() * 0.3})`,
              }}
              animate={{
                y: [0, -(30 + Math.random() * 60), 0],
                x: [0, (Math.random() - 0.5) * 40, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Orbiting rings */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <motion.div
            className="absolute h-[500px] w-[500px] rounded-full border border-primary/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary/30" />
          </motion.div>
          <motion.div
            className="absolute h-[700px] w-[700px] rounded-full border border-primary/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary/20" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          style={{ y, opacity, scale: textScale, filter: blur.get() ? `blur(${blur.get()}px)` : "none" }}
          className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          {/* Glowing orb behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[500px] w-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.2), transparent 60%)" }}
          />

          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <div className="relative mx-auto h-16 w-16 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="font-heading text-2xl font-bold text-gradient-gold">VII</span>
            </div>
          </motion.div>

          <div className="overflow-hidden">
            <AnimatedText
              text="Crafted for Authority."
              className="font-heading text-5xl font-light leading-tight tracking-wide text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
            />
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="block font-heading text-5xl font-light leading-tight tracking-wide text-gradient-gold sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Built for Legacy.
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
            className="mt-6 max-w-2xl font-body text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
          >
            Custom office ceremonial boxes, made for leaders who leave a mark.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/shop"
              className="group relative overflow-hidden rounded-sm border border-primary px-8 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition-all duration-500"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary-foreground">Explore Collection</span>
              <div className="absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>
            <motion.a
              href="#customize"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-sm bg-primary px-8 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 gold-glow-hover"
            >
              Build Yours
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator - fade out when scrolling starts */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.span
            className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="h-8 w-px bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
