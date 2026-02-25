import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { navigation, NavItem, MegaMenuColumn } from "@/data/navigation";
import { useCart } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

/* ── Mega Menu (fixed, centered) ── */
const MegaMenu = ({ columns }: { columns: MegaMenuColumn[] }) => (
  <motion.div
    initial={{ opacity: 0, y: -4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.2 }}
    className="fixed left-0 right-0 bg-background border-b border-border shadow-lg z-50"
    style={{ top: "var(--header-bottom, 120px)" }}
  >
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
  </motion.div>
);

/* ── Dropdown ── */
const DropdownMenu = ({
  items,
  triggerRef,
}: {
  items: { label: string; slug: string; href?: string }[];
  triggerRef: React.RefObject<HTMLElement | null>;
}) => {
  const [pos, setPos] = useState({ left: 0 });

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let left = rect.left;
      // prevent overflow
      if (left + 200 > window.innerWidth) left = window.innerWidth - 210;
      if (left < 10) left = 10;
      setPos({ left });
    }
  }, [triggerRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="fixed bg-background border border-border shadow-lg z-50 min-w-48 py-2"
      style={{ top: "var(--header-bottom, 120px)", left: pos.left }}
    >
      {items.map((item) => (
        <Link
          key={item.slug}
          to={item.href || `/collections/${item.slug}`}
          className="block px-6 py-2 text-sm font-body text-foreground hover:bg-secondary hover:text-gold transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
};

/* ── Header ── */
const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const count = totalItems();
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update CSS variable for dropdown positioning
  useEffect(() => {
    if (headerRef.current) {
      const updatePos = () => {
        const rect = headerRef.current!.getBoundingClientRect();
        document.documentElement.style.setProperty("--header-bottom", `${rect.bottom}px`);
      };
      updatePos();
      window.addEventListener("scroll", updatePos, { passive: true });
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos);
        window.removeEventListener("resize", updatePos);
      };
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      {/* Logo bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-display font-semibold tracking-wide text-charcoal">
              Canvas Culture
            </h1>
          </Link>

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
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-body font-semibold"
                >
                  {count}
                </motion.span>
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
                ref={(el) => {
                  if (el) triggerRefs.current.set(item.label, el);
                }}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="block px-3 py-3 text-xs font-body font-medium uppercase tracking-widest text-foreground hover:text-gold transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-2 left-3 right-3 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 px-3 py-3 text-xs font-body font-medium uppercase tracking-widest text-foreground hover:text-gold transition-colors relative group">
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                    <span className="absolute bottom-2 left-3 right-3 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                )}

                <AnimatePresence>
                  {activeMenu === item.label && item.megaMenu && (
                    <MegaMenu columns={item.megaMenu} />
                  )}
                  {activeMenu === item.label && item.dropdown && (
                    <DropdownMenu
                      items={item.dropdown}
                      triggerRef={{ current: triggerRefs.current.get(item.label) || null }}
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-y-auto max-h-[70vh]"
          >
            <nav className="px-4 py-4">
              {navigation.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ── Mobile Nav Item ── */
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.slug}
                  to={(link as any).href || `/collections/${link.slug}`}
                  onClick={onClose}
                  className="block py-1 text-sm font-body text-muted-foreground hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
