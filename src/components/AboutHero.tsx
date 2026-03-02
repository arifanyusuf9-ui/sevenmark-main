import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AboutCanvas } from "./AboutCanvas";
import { TextEffect } from "./ui/text-effect";

const AboutHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.85, 0.9, 0.98], [0, 1, 1]);

    const yMove = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={containerRef} className="relative min-h-[1000vh] bg-background">
            <AboutCanvas />

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="container mx-auto px-6 relative z-10 w-full h-full pointer-events-none">

                    {/* Story Step 1 - Top Left */}
                    <motion.div
                        style={{ opacity: opacity1, y: yMove }}
                        className="absolute top-[20%] left-6 md:left-20 max-w-xl text-left"
                    >
                        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-gradient-gold mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                            <TextEffect text="THE CEREMONY" />
                        </h1>
                        <TextEffect
                            text="Every signature deserves a legacy."
                            className="font-body text-foreground text-lg md:text-xl tracking-widest uppercase max-w-md italic drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
                            stagger={0.02}
                        />
                    </motion.div>

                    {/* Story Step 2 - Bottom Right */}
                    <motion.div
                        style={{ opacity: opacity2, y: yMove }}
                        className="absolute bottom-[20%] right-6 md:right-20 max-w-xl text-right"
                    >
                        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] text-foreground mb-6 uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                            <TextEffect text="Crafted with " />
                            <TextEffect text="Intention" className="text-secondary italic" />
                        </h2>
                        <TextEffect
                            text="Meticulously engineered from sustainable materials and finished with high-precision gold accents."
                            className="font-body text-foreground/90 text-sm md:text-base tracking-[0.2em] max-w-md ml-auto font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
                            stagger={0.01}
                        />
                    </motion.div>

                    {/* Story Step 3 - Top Right */}
                    <motion.div
                        style={{ opacity: opacity3, y: yMove }}
                        className="absolute top-[20%] right-6 md:right-20 max-w-xl text-right"
                    >
                        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] text-foreground mb-6 uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
                            <TextEffect text="Personal " />
                            <TextEffect text="Elegance" className="text-primary" />
                        </h2>
                        <TextEffect
                            text="Tailored to your identity. A marking of time, success, and the art of the workspace."
                            className="font-body text-foreground/90 text-sm md:text-base tracking-[0.2em] max-w-md ml-auto font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
                            stagger={0.01}
                        />
                    </motion.div>

                    {/* Story Step 4 - Center Reveal */}
                    <motion.div
                        style={{ opacity: opacity4, y: yMove }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                    >
                        <h2 className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-foreground mb-8 drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
                            <TextEffect text="SEVEN" />
                            <TextEffect text="MARK" className="text-primary" />
                        </h2>
                        <div className="h-px w-32 bg-primary/50 mx-auto mb-8" />
                        <TextEffect
                            text="Haptic Luxury Redefined"
                            className="font-body text-foreground text-xs md:text-sm tracking-[1em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-medium"
                            stagger={0.05}
                        />
                    </motion.div>

                </div>
            </div>

            {/* Ambient background glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
            </div>
        </section>
    );
};

export default AboutHero;
