import { motion, AnimatePresence } from "framer-motion";

interface ProductPreviewProps {
    wood: string;
    ribbon: string;
    engraving: string;
    finish: 'gold' | 'silver';
    className?: string;
    size?: 'default' | 'large';
}

const woodColors: Record<string, string> = {
    Walnut: "hsl(25, 30%, 25%)",
    Mahogany: "hsl(10, 40%, 22%)",
    Oak: "hsl(35, 25%, 40%)",
};

const ribbonColors: Record<string, string> = {
    Gold: "hsl(43, 52%, 54%)",
    Black: "hsl(0, 0%, 4%)",
    Navy: "hsl(220, 50%, 20%)",
};

export const ProductPreview = ({
    wood,
    ribbon,
    engraving,
    finish,
    className = "",
    size = 'default'
}: ProductPreviewProps) => {
    const dimensions = size === 'large'
        ? "w-full max-w-[500px] aspect-[4/3] sm:h-96 sm:w-[500px]"
        : "w-full max-w-[384px] aspect-[4/3] sm:h-72 sm:w-96";
    const fontSize = size === 'large' ? "text-xl sm:text-2xl" : "text-base sm:text-lg";

    // Hardware color logic
    const hardwareColor = finish === 'gold' ? "hsl(43 52% 54%)" : "hsl(202 10% 80%)";
    const hardwareOpacity = finish === 'gold' ? "40%" : "60%";

    return (
        <motion.div
            className={`relative flex items-center justify-center shadow-2xl overflow-hidden ${dimensions} ${className}`}
            animate={{ backgroundColor: woodColors[wood] || woodColors.Walnut }}
            transition={{ duration: 0.6 }}
            whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
            style={{ perspective: 800, transformStyle: "preserve-3d" }}
        >
            {/* Wood grain texture overlay */}
            <div className="absolute inset-0 opacity-20"
                style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(0 0% 0% / 0.1) 2px, hsl(0 0% 0% / 0.1) 4px)" }}
            />
            {/* Horizontal Ribbon */}
            <motion.div
                className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 z-0"
                animate={{ backgroundColor: ribbonColors[ribbon] || ribbonColors.Gold }}
                transition={{ duration: 0.5 }}
            />
            {/* Engraving text */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={engraving}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-10 left-0 w-full text-center z-10 font-heading font-light italic tracking-wider text-foreground/80 ${fontSize}`}
                >
                    {engraving || "Your Name"}
                </motion.p>
            </AnimatePresence>
            {/* Accent line */}
            <div
                className="absolute bottom-6 left-1/2 h-px w-24 -translate-x-1/2"
                style={{ backgroundColor: hardwareColor, opacity: 0.4 }}
            />
            {/* Corner accents */}
            <div className="absolute top-3 left-3 h-4 w-4 border-l border-t" style={{ borderColor: hardwareColor, opacity: 0.3 }} />
            <div className="absolute top-3 right-3 h-4 w-4 border-r border-t" style={{ borderColor: hardwareColor, opacity: 0.3 }} />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-l border-b" style={{ borderColor: hardwareColor, opacity: 0.3 }} />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-r border-b" style={{ borderColor: hardwareColor, opacity: 0.3 }} />

            {/* Brand Mark */}
            <div className="absolute bottom-4 right-4 z-20 overflow-hidden rounded-sm opacity-60 transition-opacity hover:opacity-90">
                <img
                    src="/brand-logo.png"
                    alt="Brand Mark"
                    className="h-4 sm:h-6 w-auto object-contain"
                    style={{
                        filter: finish === 'gold' ? 'none' : 'grayscale(1) brightness(1.5)',
                        mixBlendMode: 'screen'
                    }}
                />
            </div>

            {/* Ambient glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ background: `radial-gradient(circle at 30% 30%, ${hardwareColor}, transparent 60%)`, opacity: 0.2 }}
            />
        </motion.div>
    );
};

