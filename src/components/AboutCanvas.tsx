import { useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;

export const AboutCanvas = () => {
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
            const isMobile = window.innerWidth < 768;
            const skipFactor = isMobile ? 2 : 1;
            const loadedImages = new Array(FRAME_COUNT);

            const promises = [];
            for (let i = 0; i < FRAME_COUNT; i += skipFactor) {
                promises.push(new Promise((resolve) => {
                    const img = new Image();
                    // Using the new frame sequence location
                    img.src = `/frame_sequence/frame_${String(i).padStart(3, '0')}_delay-0.041s.jpg`;
                    img.onload = () => {
                        if (isCancelled) return resolve(null);
                        loadedImages[i] = img;
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i} at ${img.src}`);
                        resolve(null);
                    };
                }));
            }

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

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        if (context) {
            context.scale(dpr, dpr);
        }

        const render = (progress: number) => {
            const ANIMATION_END_PERCENTAGE = 0.95;
            const mappedProgress = Math.min(1, progress / ANIMATION_END_PERCENTAGE);

            const rawFrameIndex = Math.floor(mappedProgress * FRAME_COUNT);
            const isMobile = window.innerWidth < 768;
            const skipFactor = isMobile ? 2 : 1;
            const targetIndex = rawFrameIndex - (rawFrameIndex % skipFactor);
            const frameIndex = Math.min(FRAME_COUNT - 1, targetIndex);

            if (context && images[frameIndex]) {
                const img = images[frameIndex];

                const scale = Math.min(rect.width / img.width, rect.height / img.height) * 0.9;
                const x = (rect.width / 2) - (img.width / 2) * scale;
                const y = (rect.height / 2) - (img.height / 2) * scale;

                context.clearRect(0, 0, rect.width, rect.height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        render(smoothProgress.get());
        const unsubscribe = smoothProgress.on("change", render);

        const handleResize = () => render(smoothProgress.get());
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, smoothProgress, isLoading]);

    return (
        <div ref={containerRef} className="absolute inset-0 h-[1000vh] w-full pointer-events-none z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain brightness-100"
                    style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}
                />
            </div>
        </div>
    );
};
