import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { navigation, NavItem } from "@/data/navigation";
import { useCart } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

/* ── Dropdown ── */
const Dropdown = ({
  items,
  triggerRef,
}: {
  items: { label: string; href: string }[];
  triggerRef: React.RefObject<HTMLElement | null>;
}) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let l = rect.left + rect.width / 2 - 100;
      if (l + 200 > window.innerWidth) l = window.innerWidth - 210;
      if (l < 10) l = 10;
      setLeft(l);
    }
  }, [triggerRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed z-50"
      style={{ top: 56, left }}
    >
      <div
        className="bg-background min-w-[200px] py-5 px-5"
        style={{
          borderTop: "2px solid #C9A84C",
          boxShadow: "0 16px 48px rgba(0,0,0,0.09)",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block font-body uppercase text-foreground transition-all duration-200 hover:text-gold hover:translate-x-[3px]"
            style={{ fontSize: "11px", letterSpacing: "0.09em", padding: "9px 0" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Header ── */
const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const count = totalItems();
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());
  const prevCount = useRef(count);
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    if (count > prevCount.current) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 400);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <header
      className="sticky top-0 z-40 bg-background"
      style={{ height: 56, borderBottom: "1px solid #E8E4DE" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Left — Logo (mobile: hamburger) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1 active:scale-95"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link to="/" className="flex-shrink-0">
            <span
              className="font-display font-semibold tracking-wide text-charcoal"
              style={{ fontSize: 22 }}
            >
              Canvas Culture
            </span>
          </Link>
        </div>

        {/* Center — Nav */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: 28 }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() =>
                item.dropdown ? setActiveMenu(item.label) : setActiveMenu(null)
              }
              ref={(el) => {
                if (el) triggerRefs.current.set(item.label, el);
              }}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className="block font-body font-medium uppercase text-foreground hover:text-gold transition-colors relative group"
                  style={{ fontSize: 11, letterSpacing: "0.09em", lineHeight: "56px" }}
                >
                  {item.label}
                  <span className="absolute bottom-[16px] left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </Link>
              ) : (
                <button
                  className="flex items-center gap-1 font-body font-medium uppercase text-foreground hover:text-gold transition-colors relative group"
                  style={{ fontSize: 11, letterSpacing: "0.09em", lineHeight: "56px" }}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-2.5 h-2.5 opacity-40 transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                  />
                  <span className="absolute bottom-[16px] left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                </button>
              )}

              <AnimatePresence>
                {activeMenu === item.label && item.dropdown && (
                  <Dropdown
                    items={item.dropdown}
                    triggerRef={{ current: triggerRefs.current.get(item.label) || null }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right — Icons */}
        <div className="flex items-center" style={{ gap: 20 }}>
          <button
            aria-label="Search"
            className="p-1 text-foreground hover:text-gold transition-all duration-200 hover:scale-110"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={toggleCart}
            className={`p-1 text-foreground hover:text-gold transition-all duration-200 hover:scale-110 relative ${cartBounce ? "animate-bounce" : ""}`}
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gold"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-y-auto max-h-[85vh] absolute left-0 right-0 top-[56px] z-50"
            style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.09)" }}
          >
            <nav className="px-4 py-3">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <MobileNavItem item={item} onClose={() => setMobileOpen(false)} />
                </motion.div>
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

  if (!item.dropdown) {
    return (
      <Link
        to={item.href || "/"}
        onClick={onClose}
        className="block py-3 font-body font-medium uppercase tracking-wider text-foreground border-b border-border"
        style={{ fontSize: 11, letterSpacing: "0.09em" }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 font-body font-medium uppercase tracking-wider text-foreground"
        style={{ fontSize: 11, letterSpacing: "0.09em" }}
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 opacity-40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div
              className="pb-3 pl-4 space-y-1"
              style={{ borderLeft: "3px solid #C9A84C" }}
            >
              {item.dropdown.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className="block py-1.5 font-body text-muted-foreground hover:text-gold transition-colors"
                  style={{ fontSize: 11 }}
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
