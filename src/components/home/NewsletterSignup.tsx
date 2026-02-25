import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-light-cream py-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-semibold text-foreground mb-3">
          Stay Inspired
        </h2>
        <p className="text-muted-foreground font-body mb-8">
          Join our newsletter for new arrivals, exclusive offers, and curated art inspiration.
        </p>
        {submitted ? (
          <p className="text-gold font-body font-medium">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-hover text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider px-8 py-3 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
