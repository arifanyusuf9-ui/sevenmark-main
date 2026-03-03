import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { VaporizeAnimationText } from "./ui/vaporize-animation-text";

const showcaseImages = [
    "/showcase/Picsart_26-03-02_16-06-25-171.png",
    "/showcase/Picsart_26-03-02_16-06-52-760.png",
    "/showcase/Picsart_26-03-02_16-07-46-792.png",
];

const HeroShowcase = () => {
    const isMobile = useIsMobile();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className={cn(
                "flex flex-col gap-6",
                isMobile ? "items-center" : "items-end"
            )}
        >
            <div className={cn(
                "flex items-center items-end gap-2",
                isMobile ? "h-16" : "h-32"
            )}>
                {showcaseImages.map((img, i) => (
                    <motion.div
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        animate={{
                            scale: activeIndex === i ? (isMobile ? 1.15 : 1.25) : 0.8,
                            opacity: activeIndex === i ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className={cn(
                            "rounded-2xl border backdrop-blur-md flex items-center justify-center p-2 cursor-pointer overflow-hidden relative group",
                            i === activeIndex
                                ? (isMobile
                                    ? 'h-12 w-12 border-primary bg-black/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                                    : 'h-24 w-24 border-primary bg-black/40 shadow-[0_0_30px_rgba(212,175,55,0.2)]')
                                : (isMobile ? 'h-9 w-9 border-white/5 bg-white/5' : 'h-16 w-16 border-white/5 bg-white/5')
                        )}
                    >
                        <img
                            src={img}
                            alt={`Box Item ${i}`}
                            className="h-full w-full object-contain"
                        />
                        {activeIndex === i && (
                            <motion.div
                                layoutId="heroGoldBar"
                                className="absolute inset-x-0 bottom-0 h-1 bg-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            <div className={cn("flex items-center gap-2", !isMobile && "pr-1")}>
                {showcaseImages.map((_, i) => (
                    <motion.div
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        animate={{
                            width: activeIndex === i ? (isMobile ? 32 : 48) : 12,
                            opacity: activeIndex === i ? 1 : 0.3,
                            backgroundColor: activeIndex === i ? "rgb(212, 175, 55)" : "rgb(255, 255, 255)"
                        }}
                        className="h-1.5 rounded-full cursor-pointer transition-all duration-500"
                    />
                ))}
            </div>
        </motion.div>
    );
};

const CinematicHero = () => {
    const isMobile = useIsMobile();

    return (
        <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Fullscreen Animation Layer */}
            <div className="absolute inset-0 z-[21] pointer-events-none">
                <VaporizeAnimationText
                    texts={["SEVENMARK", "A Mark Of", "Appreciation"]}
                    fontSize={isMobile ? "30px" : "130px"}
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontWeight={300}
                    color="rgb(255, 255, 255)"
                    textX={isMobile ? "50%" : "5%"}
                    textY={isMobile ? "70%" : "85%"}
                    textAlign={isMobile ? "center" : "left"}
                    className="w-full h-full"
                />
            </div>

            {/* 1. Cinematic Background Video */}
            <div className="absolute inset-0 z-0 select-none">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover grayscale-[0.3]"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
            </div>

            {/* 2. Main Content Wrapper */}
            <div className={cn(
                "relative z-10 w-full max-w-7xl px-8 flex h-full",
                isMobile ? "flex-col justify-start items-center text-center gap-6 pt-28" : "flex-row items-center justify-between"
            )}>

                {/* Left Side: Headline & Button */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: isMobile ? 0 : [-20, -35, -20]
                    }}
                    transition={{
                        opacity: { duration: 1, delay: 0.5 },
                        x: { duration: 1, delay: 0.5 },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={cn(
                        "max-w-[340px] space-y-6",
                        isMobile && "flex flex-col items-center"
                    )}
                >
                    <div className="space-y-2">
                        <h2 className={cn(
                            "font-heading text-white font-light tracking-wide leading-tight",
                            isMobile ? "text-2xl" : "text-4xl"
                        )}>
                            Curated Craft,<br />
                            <span className="text-gradient-gold">Distilled Purpose</span>
                        </h2>
                    </div>
                    <Link to="/shop">
                        <Button className="rounded-full bg-white/5 border border-primary/30 hover:bg-primary/20 text-white gap-3 px-8 group transition-all duration-500">
                            <ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">To Catalog</span>
                        </Button>
                    </Link>
                </motion.div>

                {/* Right Side: Box Components Specs */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: isMobile ? 0 : [-20, -10, -20]
                    }}
                    transition={{
                        opacity: { duration: 1, delay: 0.7 },
                        x: { duration: 1, delay: 0.7 },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                >
                    <div className={cn(
                        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative group",
                        isMobile ? "p-3 w-[200px]" : "p-6 w-[260px]"
                    )}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Box Components</p>
                        <div className="flex items-start gap-4 mb-3">
                            <span className="text-4xl font-heading text-white font-light">3</span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] uppercase tracking-[0.1em] text-white font-bold leading-none">Premium</span>
                                <span className="text-[12px] uppercase tracking-[0.2em] text-white leading-none">Items</span>
                            </div>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3">
                                <div className="h-1 w-1 bg-primary rotate-45" />
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold">Notebook, Pen, Tumbler</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* 3. Bottom Layer: Catalog Showcase */}
            <div className={cn(
                "absolute left-0 right-0 px-8 flex items-end",
                isMobile ? "bottom-4 justify-center" : "bottom-12 justify-end",
                "z-20"
            )}>
                <HeroShowcase />
            </div>

            {/* Scroll Indicator - Hidden on Mobile */}
            {!isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{
                        opacity: { delay: 2, duration: 1 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
                >
                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold">Scroll</span>
                    <div className="w-[1px] h-6 bg-gradient-to-b from-white/30 to-transparent" />
                </motion.div>
            )}
        </section>
    );
};

export default CinematicHero;
