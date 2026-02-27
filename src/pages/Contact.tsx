import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-8 py-16 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-12"
        >
          Contact Us
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              We'd love to hear from you
            </h2>
            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-8">
              Whether you have a question about our products, need help with an order, or just want to say hello — we're here for you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-sm font-body text-foreground">hello@canvasculture.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-sm font-body text-muted-foreground">We reply within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-off-white p-8 border border-border text-center">
                <p className="text-lg font-display font-semibold text-foreground mb-2">Message sent!</p>
                <p className="text-sm font-body text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-2">Name</label>
                  <input required className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-2">Email</label>
                  <input type="email" required className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-2">Subject</label>
                  <input required className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-2">Message</label>
                  <textarea required rows={5} className="w-full border border-border bg-background px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors resize-none" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-widest py-4 transition-all hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
