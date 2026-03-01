import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative bg-charcoal py-24 sm:py-32 overflow-hidden">
      {/* Ambient orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.1), transparent 70%)" }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Sparkles className="mx-auto mb-4 text-primary" size={24} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl"
        >
          Join the <span className="text-gradient-gold">Inner Circle</span>
        </motion.h2>
        <p className="mb-10 font-body text-sm text-muted-foreground">
          Be the first to access limited edition drops.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className={`relative flex-1 rounded-sm transition-all duration-500 ${focused ? "gold-glow" : ""}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter your email"
              className="w-full rounded-sm border border-border bg-input px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 gold-glow-hover"
          >
            Join
            <ArrowRight size={14} />
          </motion.button>
        </motion.form>

        <p className="mt-4 font-body text-xs text-muted-foreground/60">
          No spam. Only ceremonial excellence.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
