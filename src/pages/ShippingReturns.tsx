import { motion } from "framer-motion";
import { Truck, RotateCcw, Clock, Camera } from "lucide-react";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const sections = [
  {
    icon: Truck,
    title: "Free Shipping — Always",
    content: "Every order ships free, no matter the size. No minimums, no surprises. We believe great art should arrive without extra costs."
  },
  {
    icon: Clock,
    title: "Delivery Times",
    content: "Standard shipping: 5–7 business days. Express shipping: 2–3 business days (available at checkout). All orders are made to order and ship from our facility in the USA."
  },
  {
    icon: RotateCcw,
    title: "30-Day Return Policy",
    content: "Not happy with your purchase? No problem. We offer a full 30-day return policy — no questions asked. If your canvas doesn't meet your expectations, we'll give you a full refund or send a replacement."
  },
  {
    icon: Camera,
    title: "Damaged Items",
    content: "If your order arrives damaged, simply take a photo and email us. We'll ship a replacement immediately at no cost to you. Your satisfaction is our priority."
  },
];

const steps = [
  "Contact us at hello@canvasculture.com with your order number",
  "Ship the item back to us (we'll provide a prepaid label)",
  "Receive your refund within 48 hours of us receiving the return",
];

const ShippingReturns = () => (
  <div className="min-h-screen flex flex-col">
    <PromoBanner />
    <Header />
    <CartDrawer />

    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4"
      >
        Shipping & Returns
      </motion.h1>
      <p className="text-muted-foreground font-body mb-12">Everything you need to know about getting your canvas — and returning it if needed.</p>

      <div className="space-y-12">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-5"
          >
            <s.icon className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-2">{s.title}</h2>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-off-white p-8 border border-border"
      >
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">How to Return</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm font-body text-muted-foreground">
              <span className="w-6 h-6 flex items-center justify-center bg-gold text-primary-foreground text-xs font-semibold flex-shrink-0">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </motion.div>
    </main>

    <Footer />
  </div>
);

export default ShippingReturns;
