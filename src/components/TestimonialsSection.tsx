import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I gifted this to our retiring CEO and the entire boardroom went silent when he opened it.",
    name: "James K.",
    role: "Fortune 500 HR Director",
  },
  {
    quote: "The engraving quality is unlike anything I've seen. It felt like a museum piece.",
    name: "Layla M.",
    role: "Corporate Events Manager",
  },
  {
    quote: "We ordered 50 for our annual awards night. Every single recipient was floored.",
    name: "Daniel O.",
    role: "Marketing Director",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="relative bg-charcoal py-24 sm:py-32 overflow-hidden">
      {/* Ambient floating elements */}
      <motion.div
        className="absolute top-10 right-10 text-primary/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <Quote size={200} />
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-10 text-primary/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <Quote size={150} />
      </motion.div>

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
            What they say
          </motion.span>
          <h2 className="font-heading text-3xl font-light tracking-wide text-foreground sm:text-4xl lg:text-5xl">
            Voices of <span className="text-gradient-gold">Excellence</span>
          </h2>
        </motion.div>

        <div
          className="relative mx-auto min-h-[250px] max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star size={18} className="fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>

              <p className="mb-8 font-heading text-xl font-light italic leading-relaxed text-foreground sm:text-2xl lg:text-3xl">
                "{testimonials[current].quote}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-muted font-heading text-sm font-semibold text-primary"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {testimonials[current].name.charAt(0)}
                </motion.div>
                <div className="text-left">
                  <p className="font-body text-sm font-semibold text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-10 flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.3 }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-primary gold-glow" : "w-2 bg-muted hover:bg-muted-foreground"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
