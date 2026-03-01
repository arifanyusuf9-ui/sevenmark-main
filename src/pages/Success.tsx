import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShaderBackground from "@/components/ui/shader-background";

const Success = () => {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
                <ShaderBackground />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary gold-border-glow">
                            <CheckCircle size={48} />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="font-heading text-4xl font-light tracking-wide text-foreground sm:text-5xl lg:text-6xl"
                        >
                            Order <span className="text-gradient-gold">Confirmed</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 max-w-xl font-body text-lg text-muted-foreground"
                        >
                            Your custom ceremonial box is now in production. You will receive an email confirmation shortly with your order details and tracking information.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="mt-12 flex flex-col gap-4 sm:flex-row"
                        >
                            <Link
                                to="/shop"
                                className="group flex items-center justify-center gap-2 rounded-sm bg-primary px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all gold-glow-hover"
                            >
                                <ShoppingBag size={18} />
                                Continue Shopping
                            </Link>
                            <Link
                                to="/"
                                className="group flex items-center justify-center gap-2 border border-border bg-card px-8 py-4 font-body text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-primary/50"
                            >
                                Return Home
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Success;
