import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const collections = [
  {
    title: "The Executive Series",
    subtitle: "Daily desk essentials box",
    image: "/products/the-sovereign.png",
  },
  {
    title: "The Legacy Edition",
    subtitle: "Retirement & milestone awards",
    image: "/products/the-heritage.png",
  },
  {
    title: "The Corporate Crest",
    subtitle: "Branded bulk orders for companies",
    image: "/products/the-crest-mark.png",
  },
];

const CollectionsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="collections" ref={ref} className="relative bg-charcoal py-24 sm:py-32 overflow-hidden">
      {/* Floating ambient orb */}
      <motion.div
        style={{ y: bgY, background: "radial-gradient(circle, hsl(43 52% 54% / 0.05), transparent 70%)" }}
        className="absolute -right-32 top-20 h-[400px] w-[400px] rounded-full pointer-events-none"
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
            Curated selections
          </motion.span>
          <h2 className="font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl">
            Our <span className="text-gradient-gold">Collections</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link to="/shop" className="group relative block cursor-pointer overflow-hidden rounded-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    loading="lazy"
                  />
                </div>
                {/* Hover overlay with reveal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700">
                  <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/75 backdrop-blur-0 group-hover:backdrop-blur-sm" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    className="relative z-10 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-center"
                  >
                    <span className="mb-2 block font-heading text-xl font-semibold text-primary-foreground">{c.title}</span>
                    <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
                      Shop Now →
                    </span>
                  </motion.div>
                </div>
                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-6 transition-opacity duration-500 group-hover:opacity-0">
                  <h3 className="font-heading text-xl font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1 font-body text-sm text-muted-foreground">{c.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
