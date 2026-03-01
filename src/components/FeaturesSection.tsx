import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const features = [
  { icon: "🪵", title: "Premium Materials", desc: "Solid walnut, mahogany, and brushed brass" },
  { icon: "✍️", title: "Laser Engraving", desc: "Custom names, logos, crests" },
  { icon: "🎁", title: "Gift-Ready Packaging", desc: "White glove unboxing experience" },
  { icon: "🏆", title: "Award & Ceremony Grade", desc: "Designed for milestone moments" },
  { icon: "🔒", title: "Secure Magnetic Closure", desc: "Satisfying, engineered precision" },
  { icon: "🌍", title: "Worldwide Delivery", desc: "Tracked, insured, luxury-handled" },
];

const FeatureCard = ({ f, i }: { f: typeof features[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className="relative gold-border-glow rounded-sm bg-card p-8 text-center cursor-pointer overflow-hidden"
    >
      {/* Spotlight effect following cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.15 : 0,
          background: `radial-gradient(300px circle at ${mouseX.get() + 150}px ${mouseY.get() + 150}px, hsl(43 52% 54%), transparent 60%)`,
        }}
      />

      <motion.div
        className="relative mb-4 text-5xl"
        animate={{
          scale: hovered ? 1.3 : 1,
          rotate: hovered ? [0, -10, 10, -5, 5, 0] : 0,
          y: hovered ? -5 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {f.icon}
      </motion.div>

      <h3 className="relative mb-2 font-heading text-lg font-semibold tracking-wide text-foreground">
        {f.title}
      </h3>
      <p className="relative font-body text-sm text-muted-foreground">{f.desc}</p>

      {/* Animated corner accents */}
      <motion.div
        className="absolute top-2 left-2 h-4 w-4 border-l border-t border-primary/0"
        animate={{ borderColor: hovered ? "hsl(43 52% 54% / 0.5)" : "hsl(43 52% 54% / 0)" }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute top-2 right-2 h-4 w-4 border-r border-t border-primary/0"
        animate={{ borderColor: hovered ? "hsl(43 52% 54% / 0.5)" : "hsl(43 52% 54% / 0)" }}
        transition={{ duration: 0.3, delay: 0.05 }}
      />
      <motion.div
        className="absolute bottom-2 left-2 h-4 w-4 border-l border-b border-primary/0"
        animate={{ borderColor: hovered ? "hsl(43 52% 54% / 0.5)" : "hsl(43 52% 54% / 0)" }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 h-4 w-4 border-r border-b border-primary/0"
        animate={{ borderColor: hovered ? "hsl(43 52% 54% / 0.5)" : "hsl(43 52% 54% / 0)" }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ width: 0, x: "-50%" }}
        animate={{ width: hovered ? "80%" : "0%", x: "-50%" }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="relative bg-background py-24 sm:py-32 overflow-hidden">
      {/* Floating ambient orbs */}
      <motion.div
        className="absolute top-20 -left-40 h-[500px] w-[500px] rounded-full pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.04), transparent 60%)" }}
      />
      <motion.div
        className="absolute bottom-20 -right-40 h-[400px] w-[400px] rounded-full pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.03), transparent 60%)" }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4 block font-body text-xs uppercase text-primary"
          >
            Excellence in every detail
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl"
          >
            Why <span className="text-gradient-gold">SevenMark</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mx-auto mt-6 h-px w-20 bg-primary/40"
          />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
