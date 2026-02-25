import { Link } from "react-router-dom";

const shopLinks = [
  { label: "New Releases", to: "/collections/new-releases" },
  { label: "Best Sellers", to: "/collections/best-sellers" },
  { label: "All Products", to: "/collections/all" },
];

const helpLinks = [
  { label: "Shipping & Returns", to: "/shipping-returns" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
  { label: "Size Guide", to: "/size-guide" },
];

const Footer = () => (
  <footer className="bg-charcoal text-secondary">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-display font-semibold text-background mb-4">Canvas Culture</h3>
          <p className="text-sm font-body text-warm-gray leading-relaxed">
            Premium canvas art prints, hand-made in the USA. Curated collections that transform your space.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-background mb-4">Shop</h4>
          <ul className="space-y-2">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm font-body text-warm-gray hover:text-gold transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-background mb-4">Help</h4>
          <ul className="space-y-2">
            {helpLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm font-body text-warm-gray hover:text-gold transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-background mb-4">Connect</h4>
          <ul className="space-y-2">
            {["Instagram", "Pinterest", "Facebook", "Twitter"].map((l) => (
              <li key={l}>
                <a href="#" className="text-sm font-body text-warm-gray hover:text-gold transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-warm-gray/20 text-center">
        <p className="text-xs font-body text-warm-gray">
          © {new Date().getFullYear()} Canvas Culture. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
