import { motion, AnimatePresence } from "framer-motion";

interface ProductPreviewProps {
    wood: string;
    ribbon: string;
    engraving: string;
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
    className = "",
    size = 'default'
}: ProductPreviewProps) => {
    const dimensions = size === 'large' ? "h-96 w-[500px]" : "h-72 w-96";
    const fontSize = size === 'large' ? "text-2xl" : "text-lg";

    return (
        <motion.div
            className={`relative flex items-center justify-center rounded-sm shadow-2xl overflow-hidden ${dimensions} ${className}`}
            animate={{ backgroundColor: woodColors[wood] || woodColors.Walnut }}
            transition={{ duration: 0.6 }}
            whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
            style={{ perspective: 800, transformStyle: "preserve-3d" }}
        >
            {/* Wood grain texture overlay */}
            <div className="absolute inset-0 opacity-20"
                style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(0 0% 0% / 0.1) 2px, hsl(0 0% 0% / 0.1) 4px)" }}
            />
            {/* Ribbon */}
            <motion.div
                className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2"
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
                    className={`relative z-10 font-heading font-light italic tracking-wider text-foreground/80 ${fontSize}`}
                >
                    {engraving || "Your Name"}
                </motion.p>
            </AnimatePresence>
            {/* Gold accent line */}
            <div className="absolute bottom-6 left-1/2 h-px w-24 -translate-x-1/2 bg-primary/40" />
            {/* Corner accents */}
            <div className="absolute top-3 left-3 h-4 w-4 border-l border-t border-primary/30" />
            <div className="absolute top-3 right-3 h-4 w-4 border-r border-t border-primary/30" />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-l border-b border-primary/30" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-r border-b border-primary/30" />
            {/* Ambient glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ background: "radial-gradient(circle at 30% 30%, hsl(43 52% 54% / 0.2), transparent 60%)" }}
            />
        </motion.div>
    );
};
