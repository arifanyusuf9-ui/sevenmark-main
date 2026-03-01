import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from '@stripe/stripe-js';
import { SlidersHorizontal, ShoppingBag, Heart, Star, X } from "lucide-react";
import { getApiUrl } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShaderBackground from "@/components/ui/shader-background";
import { ProductPreview } from "@/components/ProductPreview";
import { supabase } from "@/lib/supabase";

const products = [
  {
    id: 1, name: "The Sovereign", collection: "Executive", material: "Walnut",
    price: 289, image: "/products/the-sovereign.png",
    badge: "Bestseller", rating: 4.9, reviews: 128,
  },
  {
    id: 2, name: "The Diplomat", collection: "Executive", material: "Mahogany",
    price: 349, image: "/products/the-diplomat.png",
    badge: "Limited", rating: 5.0, reviews: 64,
  },
  {
    id: 3, name: "The Chairman", collection: "Legacy", material: "Walnut",
    price: 499, image: "/products/the-chairman.png",
    badge: null, rating: 4.8, reviews: 92,
  },
  {
    id: 4, name: "The Founder", collection: "Legacy", material: "Oak",
    price: 599, image: "/products/the-founder.png",
    badge: "New", rating: 4.7, reviews: 31,
  },
  {
    id: 5, name: "The Crest Mark", collection: "Corporate", material: "Mahogany",
    price: 199, image: "/products/the-crest-mark.png",
    badge: null, rating: 4.9, reviews: 215,
  },
  {
    id: 6, name: "The Insignia", collection: "Corporate", material: "Oak",
    price: 249, image: "/products/the-insignia.png",
    badge: "Bestseller", rating: 4.8, reviews: 176,
  },
  {
    id: 7, name: "The Monarch", collection: "Executive", material: "Walnut",
    price: 429, image: "/products/the-monarch.png",
    badge: null, rating: 4.6, reviews: 53,
  },
  {
    id: 8, name: "The Heritage", collection: "Legacy", material: "Mahogany",
    price: 699, image: "/products/the-heritage.png",
    badge: "Limited", rating: 5.0, reviews: 18,
  },
];

const materials = ["All", "Walnut", "Mahogany", "Oak"];
const collections = ["All", "Executive", "Legacy", "Corporate"];

const Shop = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Customization & Checkout State
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [wood, setWood] = useState("Walnut");
  const [engraving, setEngraving] = useState("Your Name");
  const [ribbon, setRibbon] = useState("Gold");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [productBadges, setProductBadges] = useState<Record<string, string>>({});

  const woods = ["Walnut", "Mahogany", "Oak"];
  const ribbons = ["Gold", "Black", "Navy"];
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error("Checkout canceled", {
        description: "Your session was canceled. Your order has not been placed.",
      });
    }

    const fetchBadges = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('product_name')
          .eq('status', 'paid');

        if (error || !data) return;

        const counts = data.reduce((acc: any, order: any) => {
          if (order.product_name) {
            acc[order.product_name] = (acc[order.product_name] || 0) + 1;
          }
          return acc;
        }, {});

        const sorted = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]);
        const newBadges: Record<string, string> = {};

        if (sorted.length > 0) newBadges[sorted[0][0] as string] = "Bestseller";
        if (sorted.length > 1) newBadges[sorted[1][0] as string] = "Trending";
        if (sorted.length > 2) newBadges[sorted[2][0] as string] = "Trending";

        setProductBadges(newBadges);
      } catch (err) {
        console.error("Failed to fetch order stats for badges:", err);
      }
    };

    fetchBadges();
  }, [searchParams]);

  const handleCheckout = async () => {
    if (!selectedProduct) return;
    setIsCheckingOut(true);
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      const response = await fetch(getApiUrl('/create-checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: selectedProduct.name,
          price: selectedProduct.price,
          woodType: wood,
          engravingText: engraving,
          ribbonColor: ribbon,
          imageUrl: selectedProduct.image,
        }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No checkout URL returned');
      }
    } catch (error: any) {
      console.error("Checkout failed:", error);
      alert(`[Checkout Error] ${error.message || 'Unknown error'}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const filtered = products.filter((p) => {
    if (selectedMaterial !== "All" && p.material !== selectedMaterial) return false;
    if (selectedCollection !== "All" && p.collection !== selectedCollection) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <ShaderBackground />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px rounded-full bg-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 80}px`,
                rotate: `${Math.random() * 360}deg`,
              }}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="font-heading text-5xl font-light tracking-wide text-foreground sm:text-6xl lg:text-7xl"
          >
            The <span className="text-gradient-gold">Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 font-body text-sm text-muted-foreground"
          >
            Every piece tells a story of craftsmanship
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <p className="font-body text-sm text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="container mx-auto grid gap-6 px-6 py-6 sm:grid-cols-2">
                <div>
                  <label className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">Material</label>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMaterial(m)}
                        className={`rounded-sm border px-4 py-2 font-body text-xs transition-all duration-300 ${selectedMaterial === m
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">Collection</label>
                  <div className="flex flex-wrap gap-2">
                    {collections.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCollection(c)}
                        className={`rounded-sm border px-4 py-2 font-body text-xs transition-all duration-300 ${selectedCollection === c
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative cursor-pointer"
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedProduct(p)}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-sm gold-border-glow">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Badge */}
                    {(productBadges[p.name] || p.badge) && (
                      <span className={`absolute left-3 top-3 rounded-sm px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest ${(productBadges[p.name] || p.badge) === "Limited"
                        ? "bg-destructive text-destructive-foreground"
                        : (productBadges[p.name] || p.badge) === "New"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                        }`}>
                        {productBadges[p.name] || p.badge}
                      </span>
                    )}
                    {/* Hover overlay */}
                    <motion.div
                      initial={false}
                      animate={{ opacity: hoveredId === p.id ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center gap-3 bg-background/60 backdrop-blur-sm"
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(p); }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-transform hover:scale-110"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag size={16} />
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-transform hover:scale-110" aria-label="Wishlist">
                        <Heart size={16} />
                      </button>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="mt-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={12} className="fill-primary text-primary" />
                      <span className="font-body text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{p.name}</h3>
                    <p className="font-body text-xs text-muted-foreground">{p.collection} · {p.material}</p>
                    <p className="mt-1 font-heading text-lg font-semibold text-gradient-gold">${p.price}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-heading text-xl text-muted-foreground">No products match your filters</p>
              <button
                onClick={() => { setSelectedMaterial("All"); setSelectedCollection("All"); }}
                className="mt-4 font-body text-sm text-primary underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Customization Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-sm border border-border bg-card shadow-2xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/80"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="bg-muted p-8 flex items-center justify-center overflow-hidden">
                  <ProductPreview wood={wood} ribbon={ribbon} engraving={engraving} className="scale-90" />
                </div>

                {/* Customization Form */}
                <div className="p-8 space-y-6 flex flex-col justify-center">
                  <div>
                    <h3 className="font-heading text-2xl text-gradient-gold">{selectedProduct.name}</h3>
                    <p className="font-body text-sm text-muted-foreground">${selectedProduct.price}</p>
                  </div>

                  {/* Wood Type */}
                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">Wood Type</label>
                    <div className="flex gap-2">
                      {woods.map((w) => (
                        <button key={w} onClick={() => setWood(w)} className={`border px-3 py-1 font-body text-xs rounded-sm ${wood === w ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>{w}</button>
                      ))}
                    </div>
                  </div>

                  {/* Ribbon */}
                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">Ribbon Color</label>
                    <div className="flex gap-2">
                      {ribbons.map((r) => (
                        <button key={r} onClick={() => setRibbon(r)} className={`border px-3 py-1 font-body text-xs rounded-sm ${ribbon === r ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}>{r}</button>
                      ))}
                    </div>
                  </div>

                  {/* Engraving */}
                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest text-muted-foreground">Engraving (Max 30)</label>
                    <input type="text" value={engraving} onChange={(e) => setEngraving(e.target.value)} maxLength={30} className="w-full border border-border bg-input px-3 py-2 text-sm focus:border-primary outline-none text-foreground" />
                  </div>

                  {/* Checkout Button */}
                  <div className="pt-4">
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className={`w-full rounded-sm bg-primary py-3 font-body text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all flex justify-center items-center ${isCheckingOut ? 'opacity-70 cursor-wait' : 'hover:bg-primary/90 gold-glow-hover'}`}
                    >
                      {isCheckingOut ? "Processing..." : `Checkout Securely`}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Shop;
