import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-charcoal text-secondary">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-display font-semibold text-background mb-4">Canvas Culture</h3>
          <p className="text-sm font-body text-warm-gray leading-relaxed">
            Premium canvas art prints, hand-made in the USA. Curated collections that transform your space.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-background mb-4">Shop</h4>
          <ul className="space-y-2">
            {["New Releases", "Best Sellers", "All Products", "Gift Cards"].map((l) => (
              <li key={l}>
                <Link to="/collections/all" className="text-sm font-body text-warm-gray hover:text-gold transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-background mb-4">Help</h4>
          <ul className="space-y-2">
            {["Shipping & Returns", "FAQ", "Contact Us", "Size Guide"].map((l) => (
              <li key={l}>
                <Link to="/contact" className="text-sm font-body text-warm-gray hover:text-gold transition-colors">{l}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
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
