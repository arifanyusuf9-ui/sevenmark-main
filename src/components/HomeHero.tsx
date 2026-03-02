import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TextEffect } from "./ui/text-effect";

const HomeHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
            {/* Cinematic Background */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-1">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-primary/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative h-full container mx-auto px-6 flex flex-col items-center justify-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ opacity, y }}
                >
                    <motion.div
                        animate={{
                            x: mousePosition.x * 0.5,
                            y: mousePosition.y * 0.5
                        }}
                        className="mb-6 inline-block"
                    >
                        <TextEffect
                            text="Exclusive Ceremony"
                            className="font-body text-xs uppercase tracking-[0.5em] text-primary/80 mb-4 block"
                        />
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-tight">
                            <TextEffect text="SEVEN" />
                            <TextEffect text="MARK" className="text-gradient-gold italic font-semibold" />
                        </h1>
                    </motion.div>

                    <TextEffect
                        text="A high-end ceremonial marking of your success. Engineered for those who craft their own story."
                        className="max-w-2xl mx-auto font-body text-muted-foreground text-sm md:text-base lg:text-lg tracking-widest leading-relaxed mb-10 uppercase"
                        stagger={0.01}
                        delay={0.5}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link to="/shop">
                            <Button size="lg" className="gold-glow-hover h-14 px-10 text-xs uppercase tracking-[0.3em] font-medium group">
                                Explore Collection
                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="h-14 px-10 text-xs uppercase tracking-[0.3em] font-light border-primary/20 hover:bg-primary/5 transition-all">
                                The Story
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom decorative lines */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="h-px w-12 bg-primary/20" />
                <div className="h-1 w-1 rotate-45 border border-primary/40" />
                <div className="h-px w-12 bg-primary/20" />
            </div>

            {/* Large background decorative logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-[0.02] z-0 overflow-hidden">
                <span className="font-heading text-[40vw] font-bold text-primary select-none whitespace-nowrap">
                    SEVENMARK
                </span>
            </div>
        </section>
    );
};

export default HomeHero;
