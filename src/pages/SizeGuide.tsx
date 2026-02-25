import { motion } from "framer-motion";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const sizes = [
  { label: '12×16"', cm: "30×41 cm", room: "Bathroom, Office, Entryway", wall: "Small accent wall", price: "$49.99" },
  { label: '18×24"', cm: "46×61 cm", room: "Bedroom, Kitchen, Hallway", wall: "Medium wall, above furniture", price: "$69.99" },
  { label: '24×36"', cm: "61×91 cm", room: "Living Room, Dining Room", wall: "Large wall, statement piece", price: "$99.99" },
  { label: '36×48"', cm: "91×122 cm", room: "Living Room, Man Cave, Office", wall: "Feature wall, above sofa", price: "$149.99" },
];

const SizeGuide = () => (
  <div className="min-h-screen flex flex-col">
    <PromoBanner />
    <Header />
    <CartDrawer />

    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-16 w-full">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4"
      >
        Size Guide
      </motion.h1>
      <p className="text-muted-foreground font-body mb-12">Find the perfect size for your space.</p>

      {/* Visual size comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-16 flex items-end gap-4 justify-center py-12 bg-off-white border border-border"
      >
        {sizes.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <div
              className="border-2 border-foreground/20 bg-background flex items-center justify-center"
              style={{ width: `${60 + i * 30}px`, height: `${80 + i * 40}px` }}
            >
              <span className="text-[10px] font-body text-muted-foreground">{s.label}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-x-auto"
      >
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 font-semibold text-foreground">Size</th>
              <th className="text-left py-4 font-semibold text-foreground">Metric</th>
              <th className="text-left py-4 font-semibold text-foreground">Recommended Room</th>
              <th className="text-left py-4 font-semibold text-foreground">Wall Placement</th>
              <th className="text-left py-4 font-semibold text-foreground">From</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.label} className="border-b border-border">
                <td className="py-4 font-semibold">{s.label}</td>
                <td className="py-4 text-muted-foreground">{s.cm}</td>
                <td className="py-4 text-muted-foreground">{s.room}</td>
                <td className="py-4 text-muted-foreground">{s.wall}</td>
                <td className="py-4 font-semibold text-gold">{s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 bg-off-white p-8 border border-border"
      >
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">Pro Tips</h2>
        <ul className="space-y-2 text-sm font-body text-muted-foreground">
          <li>• A canvas should fill about 60–75% of the wall space above furniture</li>
          <li>• Center your canvas at eye level — about 57" from the floor</li>
          <li>• For above a sofa, choose a canvas that's at least 2/3 the width of the sofa</li>
          <li>• When in doubt, go bigger — oversized art creates more impact</li>
        </ul>
      </motion.div>
    </main>

    <Footer />
  </div>
);

export default SizeGuide;
