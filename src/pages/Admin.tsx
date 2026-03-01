import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Package, DollarSign, Award, Scissors } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

type Order = {
    id: number;
    created_at: string;
    stripe_session_id: string;
    customer_email: string;
    customer_name: string;
    product_name: string;
    amount_total: number;
    wood_type: string | null;
    engraving_text: string | null;
    ribbon_color: string | null;
    status: string;
};

const Admin = () => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();

            // Set up realtime subscription
            const channel = supabase
                .channel('admin-orders')
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'orders',
                    },
                    (payload) => {
                        console.log('New order received!', payload);
                        const newOrder = payload.new as Order;
                        setOrders((currentOrders) => [newOrder, ...currentOrders]);

                        // Optional: Show a toast or notification
                        // toast.success(`New order from ${newOrder.customer_name}!`);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setOrders(data as Order[]);
        if (error) console.error("Error fetching orders:", error);
        setIsLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "sevenmark123") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-6 mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md bg-card border border-border rounded-sm p-10 text-center shadow-2xl"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary gold-glow">
                                <Lock className="w-8 h-8" />
                            </div>
                        </div>
                        <h1 className="font-heading text-2xl font-light mb-2 text-foreground">Admin Portal</h1>
                        <p className="font-body text-sm text-muted-foreground mb-8">Secure dashboard for owners.</p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full border border-border bg-input px-4 py-3 font-body text-sm outline-none focus:border-primary text-center tracking-widest text-foreground transition-colors"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:bg-primary/90 gold-glow-hover"
                            >
                                Access Identity
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>
        );
    }

    // Analytics Calculations
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount_total || 0), 0) / 100;
    const popularWood = getMostFrequent(orders.map(o => o.wood_type).filter(Boolean) as string[]);
    const popularRibbon = getMostFrequent(orders.map(o => o.ribbon_color).filter(Boolean) as string[]);

    return (
        <main className="min-h-screen bg-background pb-20">
            <Navbar />
            <div className="pt-32 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
                >
                    <div>
                        <h1 className="font-heading text-4xl text-gradient-gold">Executive Overview</h1>
                        <p className="font-body text-muted-foreground mt-2">Real-time order and customization analytics</p>
                    </div>
                    <button onClick={fetchOrders} className="font-body text-xs text-primary uppercase tracking-widest hover:underline transition-all">
                        Refresh Data
                    </button>
                </motion.div>

                {/* Analytics Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                >
                    <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={<DollarSign size={20} />} />
                    <StatCard title="Total Orders" value={orders.length} icon={<Package size={20} />} />
                    <StatCard title="Top Wood" value={popularWood || "-"} icon={<Award size={20} />} />
                    <StatCard title="Top Ribbon" value={popularRibbon || "-"} icon={<Scissors size={20} />} />
                </motion.div>

                {/* Orders Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-sm flex flex-col shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm min-w-[800px]">
                            <thead className="bg-muted/50 text-muted-foreground uppercase tracking-widest text-[10px] border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Product</th>
                                    <th className="px-6 py-4 font-semibold">Wood</th>
                                    <th className="px-6 py-4 font-semibold">Ribbon</th>
                                    <th className="px-6 py-4 font-semibold">Engraving</th>
                                    <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50 text-foreground">
                                {isLoading ? (
                                    <tr><td colSpan={7} className="text-center py-16 text-muted-foreground tracking-widest text-xs uppercase">Loading...</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td colSpan={7} className="text-center py-16 text-muted-foreground tracking-widest text-xs uppercase">No orders found.</td></tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-foreground group-hover:text-primary transition-colors">{order.customer_name}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{order.customer_email}</p>
                                            </td>
                                            <td className="px-6 py-4">{order.product_name}</td>
                                            <td className="px-6 py-4">{order.wood_type || '-'}</td>
                                            <td className="px-6 py-4">{order.ribbon_color || '-'}</td>
                                            <td className="px-6 py-4 italic text-muted-foreground">{order.engraving_text ? `"${order.engraving_text}"` : '-'}</td>
                                            <td className="px-6 py-4 text-right tabular-nums font-medium text-foreground">${((order.amount_total || 0) / 100).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

// Helper components
function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
    return (
        <div className="bg-card border border-border p-6 rounded-sm flex items-center gap-4 hover:border-primary/40 transition-all duration-300">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="overflow-hidden">
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">{title}</p>
                <p className="font-heading text-2xl text-foreground mt-1 truncate">{value}</p>
            </div>
        </div>
    );
}

function getMostFrequent(arr: string[]): string | null {
    if (!arr || arr.length === 0) return null;
    const counts = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export default Admin;
