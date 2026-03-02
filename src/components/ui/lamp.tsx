"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LampContainerProps {
    children: React.ReactNode;
    className?: string;
    theme?: "gold" | "silver";
}

export const LampContainer = ({
    children,
    className,
    theme = "gold",
}: LampContainerProps) => {
    // Theme-based colors
    // Gold uses the primary variable. Silver uses the new --silver variable.
    const accentColor = theme === "gold" ? "hsl(var(--primary))" : "hsl(var(--silver))";
    const glowColor = theme === "gold" ? "hsl(var(--primary) / 0.5)" : "hsl(var(--silver) / 0.5)";
    const lineStyle = theme === "gold" ? "bg-primary" : "bg-primary/40"; // Keep primary as base but dim for silver or use silver

    return (
        <div
            className={cn(
                "relative flex min-h-[600px] flex-col items-center justify-center overflow-visible bg-transparent w-full z-0",
                className
            )}
        >
            <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
                <motion.div
                    initial={{ opacity: 0.5, width: "15rem" }}
                    whileInView={{ opacity: 1, width: "30rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className={cn(
                        "absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]",
                        theme === "gold" ? "from-primary" : "from-ivory/60"
                    )}
                >
                    <div className="absolute  w-[100%] left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                    <div className="absolute  w-40 h-[100%] left-0 bg-background  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0.5, width: "15rem" }}
                    whileInView={{ opacity: 1, width: "30rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className={cn(
                        "absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent text-white [--conic-position:from_290deg_at_center_top]",
                        theme === "gold" ? "to-primary" : "to-ivory/60"
                    )}
                >
                    <div className="absolute  w-40 h-[100%] right-0 bg-background  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                    <div className="absolute  w-[100%] right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>

                <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl"></div>
                <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                <div
                    className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
                    style={{ backgroundColor: accentColor }}
                ></div>

                <motion.div
                    initial={{ width: "8rem" }}
                    whileInView={{ width: "16rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
                    style={{ backgroundColor: accentColor, opacity: 0.8 }}
                ></motion.div>

                <motion.div
                    initial={{ width: "15rem" }}
                    whileInView={{ width: "30rem" }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
                    style={{ backgroundColor: accentColor }}
                ></motion.div>

                <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background "></div>
            </div>

            <div className="relative z-50 flex flex-col items-center px-5 w-full -translate-y-20">
                {children}
            </div>
        </div>
    );
};
