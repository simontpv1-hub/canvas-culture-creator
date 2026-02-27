import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { navigation, NavItem } from "@/data/navigation";
import { useCart } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

/* ── Announcement Bar (Level 1) ── */
const AnnouncementBar = () => (
  <div
    className="py-2.5 text-center"
    style={{ backgroundColor: "#2d409f" }}
  >
    <p className="text-xs sm:text-sm font-body font-medium tracking-wider text-white">
      BUY 3 GET THE 4TH FREE! USE CODE: <span className="font-bold">'BUY3GET1'</span>
    </p>
  </div>
);

/* ── Simple Dropdown ── */
const SimpleDropdown = ({
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
      let l = rect.left + rect.width / 2 - 110;
      if (l + 220 > window.innerWidth) l = window.innerWidth - 230;
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
      style={{ top: "auto", left }}
    >
      <div
        className="bg-background min-w-[220px] py-4 px-5 mt-0"
        style={{
          borderTop: "2px solid hsl(var(--gold))",
          boxShadow: "0 16px 48px rgba(0,0,0,0.09)",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block font-body text-foreground transition-all duration-200 hover:text-gold hover:translate-x-[3px]"
            style={{ fontSize: "13px", padding: "8px 0" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Mega Menu Dropdown ── */
const MegaMenuDropdown = ({
  columns,
}: {
  columns: { heading: string; items: { label: string; href: string }[] }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 6 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className="fixed left-0 right-0 z-50"
    style={{ top: "auto" }}
  >
    <div
      className="max-w-[1440px] mx-auto bg-background py-8 px-10"
      style={{
        borderTop: "2px solid hsl(var(--gold))",
        boxShadow: "0 16px 48px rgba(0,0,0,0.09)",
      }}
    >
      <div className="grid gap-12" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
        {columns.map((col) => (
          <div key={col.heading}>
            <h4
              className="font-display font-semibold uppercase text-gold mb-4"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
            >
              {col.heading}
            </h4>
            {col.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block font-body text-foreground transition-all duration-200 hover:text-gold hover:translate-x-[3px]"
                style={{ fontSize: "13px", padding: "7px 0" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ── Header ── */
const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    <header className="sticky top-0 z-40 bg-background" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
      {/* Level 1 — Announcement */}
      <AnnouncementBar />

      {/* Level 2 — Logo / Search / Icons */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between" style={{ height: 64 }}>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1 active:scale-95"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="font-display font-bold tracking-wider text-charcoal uppercase" style={{ fontSize: 20, letterSpacing: "0.15em" }}>
            Canvas Culture
          </span>
        </Link>

        {/* Search bar — desktop */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, style, room, color, artist..."
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-secondary font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-0 outline-none transition-colors"
              style={{ borderRadius: 2 }}
            />
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center" style={{ gap: 18 }}>
          {/* Mobile search toggle */}
          <button
            aria-label="Search"
            className="lg:hidden p-1 text-foreground hover:text-gold transition-all duration-200 hover:scale-110"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            aria-label="Account"
            className="hidden sm:block p-1 text-foreground hover:text-gold transition-all duration-200 hover:scale-110"
          >
            <User className="w-5 h-5" />
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
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-white flex items-center justify-center"
                style={{ fontSize: 9, fontWeight: 700 }}
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-b border-border"
          >
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by subject, style, room..."
                  className="w-full pl-10 pr-4 py-2.5 border border-border bg-secondary font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-0 outline-none transition-colors"
                  style={{ borderRadius: 2 }}
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level 3 — Nav */}
      <nav
        className="hidden lg:block border-t border-border"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-center" style={{ gap: 28, height: 44 }}>
          {navigation.map((item) => {
            const hasDropdown = !!item.dropdown || !!item.megaMenu;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown ? setActiveMenu(item.label) : setActiveMenu(null)}
                ref={(el) => { if (el) triggerRefs.current.set(item.label, el); }}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="block font-body font-medium uppercase text-foreground hover:text-gold transition-colors relative group"
                    style={{ fontSize: 13, letterSpacing: "0.06em", lineHeight: "44px" }}
                  >
                    {item.label}
                    <span className="absolute bottom-[8px] left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 font-body font-medium uppercase text-foreground hover:text-gold transition-colors relative group"
                    style={{ fontSize: 13, letterSpacing: "0.06em", lineHeight: "44px" }}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 opacity-30 transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                    />
                    <span className="absolute bottom-[8px] left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                  </button>
                )}

                <AnimatePresence>
                  {activeMenu === item.label && item.dropdown && (
                    <SimpleDropdown
                      items={item.dropdown}
                      triggerRef={{ current: triggerRefs.current.get(item.label) || null }}
                    />
                  )}
                  {activeMenu === item.label && item.megaMenu && (
                    <MegaMenuDropdown columns={item.megaMenu.columns} />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-y-auto max-h-[85vh] absolute left-0 right-0 z-50"
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

  const subItems = item.dropdown || item.megaMenu?.columns.flatMap((c) => c.items) || [];

  if (!item.dropdown && !item.megaMenu) {
    return (
      <Link
        to={item.href || "/"}
        onClick={onClose}
        className="block py-3 font-body font-medium uppercase tracking-wider text-foreground border-b border-border"
        style={{ fontSize: 13 }}
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
        style={{ fontSize: 13 }}
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
              style={{ borderLeft: "3px solid hsl(var(--gold))" }}
            >
              {subItems.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className="block py-1.5 font-body text-muted-foreground hover:text-gold transition-colors"
                  style={{ fontSize: 13 }}
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
