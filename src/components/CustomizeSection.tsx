import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from '@stripe/stripe-js';
import { getApiUrl } from "@/lib/utils";
import { ProductPreview } from "./ProductPreview";

const woods = ["Walnut", "Mahogany", "Oak"];
const ribbons = ["Gold", "Black", "Navy"];

const CustomizeSection = () => {
  const [wood, setWood] = useState("Walnut");
  const [engraving, setEngraving] = useState("Your Name");
  const [ribbon, setRibbon] = useState("Gold");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // 1. Load Stripe via the Publishable Key from Vite env
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

      // 2. Call our secure Netlify Function
      const response = await fetch(getApiUrl('/create-checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: "The Custom Box",
          price: 199, // Base price
          woodType: wood,
          engravingText: engraving,
          ribbonColor: ribbon,
          imageUrl: "/sequence/frame_191_delay-0.041s.jpg", // Optional preview image
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No checkout URL returned');
      }
    } catch (error: any) {
      console.error("Checkout failed:", error);
      alert(`[Checkout Error] ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="customize" className="relative bg-background py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full pointer-events-none"
        animate={{
          opacity: [0.03, 0.06, 0.03],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, hsl(43 52% 54% / 0.1), transparent 70%)" }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 block font-body text-xs uppercase tracking-[0.3em] text-primary"
          >
            Your vision, our craft
          </motion.span>
          <h2 className="mb-4 font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl">
            Make It <span className="text-gradient-gold">Yours</span>
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            No two boxes are the same — just like the people who own them.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-center"
          >
            <ProductPreview wood={wood} ribbon={ribbon} engraving={engraving} />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Wood Type */}
            <div>
              <label className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Wood Type
              </label>
              <div className="flex gap-3">
                {woods.map((w) => (
                  <motion.button
                    key={w}
                    onClick={() => setWood(w)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-sm border px-5 py-2 font-body text-sm transition-all duration-300 ${wood === w
                      ? "border-primary bg-primary text-primary-foreground gold-glow"
                      : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                  >
                    {w}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Engraving */}
            <div>
              <label className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Engraving Text
              </label>
              <input
                type="text"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                maxLength={30}
                placeholder="Enter your text..."
                className="w-full rounded-sm border border-border bg-input px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
              />
            </div>

            {/* Ribbon */}
            <div>
              <label className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Ribbon Color
              </label>
              <div className="flex gap-3">
                {ribbons.map((r) => (
                  <motion.button
                    key={r}
                    onClick={() => setRibbon(r)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-sm border px-5 py-2 font-body text-sm transition-all duration-300 ${ribbon === r
                      ? "border-primary bg-primary text-primary-foreground gold-glow"
                      : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleCheckout}
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-block rounded-sm bg-primary px-8 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 ${isLoading ? 'opacity-70 cursor-wait' : 'gold-glow-hover'}`}
            >
              {isLoading ? "Preparing Order..." : "Secure Checkout →"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomizeSection;
