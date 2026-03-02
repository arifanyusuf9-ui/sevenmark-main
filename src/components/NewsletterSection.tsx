import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LampContainer } from "./ui/lamp";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <section className="relative bg-background overflow-hidden">
      <LampContainer className="min-h-[500px] py-20 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <Sparkles className="mx-auto mb-4 text-primary" size={24} />

          <h2 className="mb-4 font-heading text-4xl font-light tracking-wide text-foreground sm:text-5xl lg:text-7xl">
            Join the <span className="text-gradient-gold">Inner Circle</span>
          </h2>
          <p className="mb-10 font-body text-sm text-muted-foreground uppercase tracking-[0.2em]">
            Be the first to access limited edition drops.
          </p>

          <form
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
          </form>

          <p className="mt-8 font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            No spam. Only ceremonial excellence.
          </p>
        </motion.div>
      </LampContainer>
    </section>
  );
};

export default NewsletterSection;
