import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import BrandStrip from "@/components/BrandStrip";
import TestimonialsSection from "@/components/TestimonialsSection";
import CraftStorySection from "@/components/CraftStorySection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-background about-page-wrapper text-foreground">
            <Navbar />
            <AboutHero />
            <div className="relative z-10 bg-background">
                <BrandStrip />
                <CraftStorySection />
                <TestimonialsSection />
            </div>
            <Footer />
        </main>
    );
};

export default About;
