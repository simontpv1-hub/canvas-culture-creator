import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import heroImage2 from "@/assets/hero-2.jpg";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup_dismissed");
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("popup_dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/85 backdrop-blur-xl z-[60] flex items-center justify-center px-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-background w-full max-w-2xl relative flex overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left — image */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden sm:block w-1/2 relative"
            >
              <img src={heroImage2} alt="Canvas art lifestyle" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/30" />
            </motion.div>

            {/* Right — content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-1 p-8 sm:p-10 flex flex-col justify-center"
            >
              <button onClick={close} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-4">
                  <p className="text-xl font-display font-semibold text-foreground mb-2">Check your inbox!</p>
                  <p className="text-sm font-body text-muted-foreground">Your code: <span className="font-semibold text-gold">WELCOME15</span></p>
                  <button onClick={close} className="mt-6 text-sm font-body text-gold hover:text-gold-hover underline transition-colors">
                    Start Shopping →
                  </button>
                </div>
              ) : (
                <div className="text-center sm:text-left">
                  <p className="text-xs font-body font-semibold uppercase tracking-[0.25em] text-gold mb-4 shimmer-text">Limited Time Offer</p>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground mb-3 leading-tight">
                    Get 15% Off Your First Order
                  </h2>
                  <p className="text-sm font-body text-muted-foreground mb-8 leading-relaxed">
                    Join thousands of art lovers and receive exclusive deals, new arrivals, and decorating inspiration.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full border-0 border-b-2 border-border bg-transparent px-0 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors text-center sm:text-left placeholder:text-muted-foreground/60"
                      />
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-300 focus-within:w-full" />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-widest py-3.5 transition-all hover:shadow-lg active:scale-[0.97] shimmer-sweep-btn"
                    >
                      Claim My 15% Off →
                    </button>
                  </form>
                  <p className="text-xs font-body text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
