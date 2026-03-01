import { useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;

export const AntiGravityCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 25,
        restDelta: 0.001,
    });

    useEffect(() => {
        let isCancelled = false;
        const loadImages = async () => {
            const loadedImages = new Array(FRAME_COUNT);

            const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    // In Vite, items in public/ are available at the root path
                    img.src = `/sequence/frame_${String(i).padStart(3, '0')}_delay-0.041s.jpg`;
                    img.onload = () => {
                        if (isCancelled) return resolve(null);
                        loadedImages[i] = img;
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i} at ${img.src}`);
                        resolve(null);
                    };
                });
            });

            await Promise.all(promises);
            if (!isCancelled) {
                setImages(loadedImages.filter(Boolean));
                setIsLoading(false);
            }
        };

        loadImages();
        return () => { isCancelled = true; };
    }, []);

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current || isLoading) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Ensure high-resolution rendering
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        if (context) {
            context.scale(dpr, dpr);
        }

        const render = (progress: number) => {
            // Finish the animation by 90% of the scroll depth
            const ANIMATION_END_PERCENTAGE = 0.9;
            const mappedProgress = Math.min(1, progress / ANIMATION_END_PERCENTAGE);

            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(mappedProgress * FRAME_COUNT)
            );

            if (context && images[frameIndex]) {
                const img = images[frameIndex];

                const scale = Math.min(rect.width / img.width, rect.height / img.height);
                const x = (rect.width / 2) - (img.width / 2) * scale;
                const y = (rect.height / 2) - (img.height / 2) * scale;

                context.clearRect(0, 0, rect.width, rect.height);
                context.globalAlpha = 1.0;
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        render(smoothProgress.get());
        const unsubscribe = smoothProgress.on("change", render);

        // Handle window resize
        const handleResize = () => render(smoothProgress.get());
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, smoothProgress, isLoading]);

    return (
        <div ref={containerRef} className="absolute inset-0 h-[800vh] w-full pointer-events-none z-0 bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain brightness-150 contrast-125"
                    style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}
                />
            </div>
        </div>
    );
};
