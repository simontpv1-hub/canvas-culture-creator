import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { navigation, NavItem, MegaMenuColumn } from "@/data/navigation";
import { useCart } from "@/stores/cartStore";

const MegaMenu = ({ columns }: { columns: MegaMenuColumn[] }) => (
  <div className="absolute left-0 top-full w-screen bg-background border-b border-border shadow-lg z-50">
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="grid grid-cols-3 gap-12">
        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {col.heading}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.slug}>
                  <Link
                    to={`/collections/${link.slug}`}
                    className="text-sm font-body text-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DropdownMenu = ({ items }: { items: { label: string; slug: string }[] }) => (
  <div className="absolute left-0 top-full bg-background border border-border shadow-lg z-50 min-w-48 py-2">
    {items.map((item) => (
      <Link
        key={item.slug}
        to={`/collections/${item.slug}`}
        className="block px-6 py-2 text-sm font-body text-foreground hover:bg-secondary hover:text-gold transition-colors"
      >
        {item.label}
      </Link>
    ))}
  </div>
);

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const count = totalItems();

  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* Logo bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-display font-semibold tracking-wide text-charcoal">
              Canvas Culture
            </h1>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button aria-label="Search" className="p-2 hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="p-2 hover:text-gold transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-semibold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav
        className="hidden lg:block border-b border-border"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-8">
          <ul className="flex items-center justify-center gap-1">
            {navigation.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.megaMenu || item.dropdown
                    ? setActiveMenu(item.label)
                    : setActiveMenu(null)
                }
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="block px-3 py-3 text-xs font-body font-medium uppercase tracking-widest text-foreground hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-3 py-3 text-xs font-body font-medium uppercase tracking-widest text-foreground hover:text-gold transition-colors">
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                )}

                {activeMenu === item.label && item.megaMenu && (
                  <MegaMenu columns={item.megaMenu} />
                )}
                {activeMenu === item.label && item.dropdown && (
                  <DropdownMenu items={item.dropdown} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border max-h-[70vh] overflow-y-auto">
          <nav className="px-4 py-4">
            {navigation.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const MobileNavItem = ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.megaMenu || item.dropdown;

  if (!hasChildren) {
    return (
      <Link
        to={item.href || "/"}
        onClick={onClose}
        className="block py-3 text-sm font-body font-medium uppercase tracking-wider text-foreground border-b border-border"
      >
        {item.label}
      </Link>
    );
  }

  const links = item.dropdown || item.megaMenu?.flatMap((c) => c.links) || [];

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-body font-medium uppercase tracking-wider text-foreground"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3 pl-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.slug}
              to={`/collections/${link.slug}`}
              onClick={onClose}
              className="block py-1 text-sm font-body text-muted-foreground hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
