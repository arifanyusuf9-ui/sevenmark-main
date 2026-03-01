import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GravityStorySection = () => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const textY = useTransform(scrollYProgress, [0, 1], [50, -20]);

    return (
        <section ref={ref} className="relative bg-background py-32 overflow-hidden flex items-center justify-center border-y border-border/50">
            {/* Abstract ambient background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                <motion.div style={{ y: textY }}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 block font-body text-xs uppercase tracking-[0.4em] text-primary"
                    >
                        The Gravity Story
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mb-8 font-heading text-4xl font-light tracking-wide text-foreground sm:text-5xl lg:text-6xl leading-tight"
                    >
                        Defying Expectations.<br />
                        <span className="text-gradient-gold italic font-normal">Elevating the Standard.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-10 font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
                    >
                        We named our philosophy <strong className="text-foreground tracking-wide font-medium">ANTI-GRAVITY</strong> because
                        true luxury should feel effortless. It shouldn't be weighed down by mass-production.
                        By sourcing the rarest hardwoods and forging them with aerospace-grade precision, we create pieces that
                        appear to float above the ordinary. It's not just a box; it's a suspension of disbelief.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="inline-block p-[1px] rounded-sm bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                    >
                        <div className="px-10 py-5 bg-background/80 backdrop-blur-md rounded-sm">
                            <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-gradient-gold">
                                Weightless Luxury
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default GravityStorySection;
