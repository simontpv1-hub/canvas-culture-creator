import { useState, useRef } from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.08;
    const dy = (e.clientY - cy) * 0.08;
    setBtnOffset({ x: Math.max(-4, Math.min(4, dx)), y: Math.max(-4, Math.min(4, dy)) });
  };

  const handleMouseLeave = () => setBtnOffset({ x: 0, y: 0 });

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-off-white py-20"
    >
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4">
          Stay Inspired
        </h2>
        <p className="text-muted-foreground font-body mb-10 leading-relaxed">
          New arrivals, exclusive deals, and art that moves us — delivered to your inbox.
        </p>
        {submitted ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-gold font-body font-medium"
          >
            Thank you for subscribing! 🎉
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter your email"
                required
                className="w-full px-5 py-3.5 border border-border bg-background font-body text-sm focus:outline-none transition-all"
                style={{
                  borderColor: focused ? "hsl(var(--gold))" : undefined,
                  boxShadow: focused ? "0 0 0 3px hsl(var(--gold) / 0.15)" : undefined,
                }}
              />
            </div>
            <button
              ref={btnRef}
              type="submit"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider px-8 py-3.5 transition-all hover:shadow-lg active:scale-[0.97]"
              style={{
                transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
                transition: "transform 0.2s ease, background-color 0.2s, box-shadow 0.2s",
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;
