import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "About Us", href: "/#about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLink = (l: { label: string; href: string }, className: string) => {
    if (l.href.startsWith("/#")) {
      if (location.pathname === "/") {
        return (
          <a key={l.label} href={l.href.replace("/", "")} className={className} onClick={() => setMobileOpen(false)}>
            {l.label}
          </a>
        );
      }
      return (
        <Link key={l.label} to={l.href} className={className} onClick={() => setMobileOpen(false)}>
          {l.label}
        </Link>
      );
    }
    return (
      <Link key={l.label} to={l.href} className={className} onClick={() => setMobileOpen(false)}>
        {l.label}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="group relative">
          <motion.span
            className="font-heading text-2xl font-semibold tracking-[0.3em] text-foreground"
            whileHover={{ letterSpacing: "0.4em" }}
            transition={{ duration: 0.4 }}
          >
            SEVEN
          </motion.span>
          <motion.span
            className="font-heading text-2xl font-semibold tracking-[0.3em] text-gradient-gold"
            whileHover={{ letterSpacing: "0.4em" }}
            transition={{ duration: 0.4 }}
          >
            MARK
          </motion.span>
          <motion.div
            className="absolute -bottom-1 left-0 h-px bg-primary"
            initial={{ width: "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
            >
              {renderLink(l, "relative font-body text-sm tracking-widest uppercase text-muted-foreground transition-colors duration-300 hover:text-primary group")}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/#customize"
              className="ml-2 relative overflow-hidden rounded-sm border border-primary bg-primary px-5 py-2 font-body text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary gold-glow-hover"
            >
              Customize
            </Link>
          </motion.div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <motion.div whileHover={{ scale: 1.15, rotate: -5 }} whileTap={{ scale: 0.9 }}>
            <Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Cart">
              <ShoppingBag size={20} />
            </Link>
          </motion.div>
          <motion.button whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }} className="text-muted-foreground transition-colors hover:text-primary" aria-label="Account">
            <User size={20} />
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {renderLink(l, "font-body text-sm tracking-widest uppercase text-muted-foreground")}
                </motion.div>
              ))}
              <Link
                to="/#customize"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-sm border border-primary bg-primary px-5 py-3 text-center font-body text-xs font-semibold uppercase tracking-widest text-primary-foreground"
              >
                Customize
              </Link>
              <div className="flex gap-4 pt-2">
                <Link to="/shop"><ShoppingBag size={20} className="text-muted-foreground" /></Link>
                <User size={20} className="text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
