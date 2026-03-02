import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

const footerLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-background py-16 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/" className="mb-2 inline-block">
            <img
              src="/logo.jpg"
              alt="SEVENMARK"
              className="h-6 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <p className="mb-8 font-body text-xs text-muted-foreground">
            Crafted with intention.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {footerLinks.map((l) => (
            <motion.div key={l.label} whileHover={{ y: -2 }}>
              {l.href.startsWith("/") ? (
                <Link
                  to={l.href}
                  className="font-body text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              ) : (
                <a href={l.href} className="font-body text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mb-8 flex justify-center gap-4">
          {[
            { icon: <Instagram size={18} />, label: "Instagram" },
            { icon: <Linkedin size={18} />, label: "LinkedIn" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href="#"
              whileHover={{ scale: 1.15, y: -2 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        <p className="font-body text-xs text-muted-foreground/50">
          © 2026 SevenMark. Crafted with intention.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
