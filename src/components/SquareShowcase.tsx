+import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/showcase/Picsart_26-03-02_16-06-25-171.png",
    "/showcase/Picsart_26-03-02_16-06-52-760.png",
    "/showcase/Picsart_26-03-02_16-07-46-792.png",
];

const SquareShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const scrollLeft = scrollRef.current.scrollLeft;
        const containerWidth = scrollRef.current.offsetWidth;
        const itemWidth = 320; // Width + gap

        // Calculate which item is centered
        const centerOffset = scrollLeft + (containerWidth / 2);
        const index = Math.floor(scrollLeft / itemWidth);

        // More precise index calculation based on scroll position
        const newIndex = Math.round(scrollLeft / itemWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
            setActiveIndex(newIndex);
        }
    };

    const scrollToItem = (index: number) => {
        if (!scrollRef.current) return;
        const itemWidth = 320; // Adjusted for gap
        scrollRef.current.scrollTo({
            left: index * itemWidth,
            behavior: "smooth",
        });
        setActiveIndex(index);
    };

    return (
        <section className="relative bg-black py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <span className="mb-4 block font-body text-xs uppercase tracking-[0.4em] text-primary/60">
                        Catalog Selection
                    </span>
                    <h2 className="font-heading text-4xl font-light tracking-wide text-white sm:text-5xl">
                        Ceremonial <span className="text-gradient-gold">Showcase</span>
                    </h2>
                </div>

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-10 overflow-x-auto pb-24 pt-10 no-scrollbar snap-x snap-mandatory px-[calc(50%-140px)]"
                >
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            onClick={() => scrollToItem(i)}
                            initial={false}
                            animate={{
                                scale: activeIndex === i ? 1.15 : 0.85,
                                opacity: activeIndex === i ? 1 : 0.4,
                            }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative min-w-[280px] aspect-square cursor-pointer snap-center group"
                        >
                            {/* The "Frame" from user screenshot */}
                            <div className="relative h-full w-full rounded-[30px] overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-primary/30">
                                <img
                                    src={img}
                                    alt={`Showcase ${i}`}
                                    className="h-full w-full object-contain p-4"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                                        target.parentElement!.innerHTML = `<span class="text-primary/20 text-xs">IMAGE NOT FOUND</span>`;
                                    }}
                                />

                                {/* Gold bar accent at bottom for active item */}
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                        opacity: activeIndex === i ? 1 : 0,
                                        height: activeIndex === i ? 12 : 0
                                    }}
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80"
                                />
                            </div>

                            {/* Selection Glow */}
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute -inset-4 rounded-[40px] border border-primary/20 pointer-events-none z-0"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Text Info */}
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute -bottom-20 left-0 right-0 text-center"
                                    >
                                        <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary/80">
                                            Signature Piece
                                        </p>
                                        <h3 className="font-heading text-2xl text-white mt-1 font-light">
                                            {i === 0 ? "The Sovereign" : i === 1 ? "The Heritage" : "The Crest"}
                                        </h3>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Custom Progress Tracker */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <div className="h-px w-12 bg-white/10" />
                    <div className="flex gap-3">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToItem(i)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? "w-10 bg-primary shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "w-1.5 bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="h-px w-12 bg-white/10" />
                </div>
            </div>
        </section>
    );
};

export default SquareShowcase;
