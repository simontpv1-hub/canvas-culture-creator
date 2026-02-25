import { useState } from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
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
          <p className="text-gold font-body font-medium">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider px-8 py-3.5 transition-colors"
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
