import { motion } from "framer-motion";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import heroImage1 from "@/assets/hero-1.jpg";

const values = [
  { title: "Quality First", desc: "Every canvas is hand-stretched, printed with archival inks, and built to last decades — not months." },
  { title: "Art For Everyone", desc: "Museum-quality prints shouldn't cost museum prices. We make beautiful art accessible to real people." },
  { title: "Made With Care", desc: "From selection to shipping, every step is handled with intention. We'd never send something we wouldn't hang ourselves." },
];

const stats = [
  { value: "10,000+", label: "Orders Shipped" },
  { value: "500+", label: "Curated Designs" },
  { value: "2", label: "Founders" },
  { value: "1", label: "Mission" },
];

const About = () => (
  <div className="min-h-screen flex flex-col">
    <PromoBanner />
    <Header />
    <CartDrawer />

    <main className="flex-1">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={heroImage1} alt="Canvas art lifestyle" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-semibold text-background leading-tight"
          >
            Two friends. One obsession.
            <br />
            Infinite walls.
          </motion.h1>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-base sm:text-[17px] font-body text-muted-foreground leading-relaxed"
        >
          <p className="text-xl sm:text-2xl font-display font-semibold text-foreground leading-snug">
            It started in 2023 with a problem we both had — ugly walls.
          </p>
          <p>
            Marcus and James had been friends since college, both obsessed with interior design, vintage aesthetics, and the kind of art that actually says something. After spending weeks trying to find canvas prints that weren't generic stock photos or overpriced gallery pieces, we thought: why doesn't something like this exist?
          </p>
          <p>So we built it.</p>
          <p>
            Canvas Culture launched in the summer of 2023 from a small apartment in Montreal. Our first "office" was a kitchen table. Our first product was a vintage Porsche 911 that Marcus had been trying to find for his bedroom for months.
          </p>
          <p>
            Today, Canvas Culture ships thousands of prints across North America. But the mission is exactly the same as day one: help people find art that actually means something to them, at a price that doesn't hurt.
          </p>
          <p>
            Every canvas is still hand-made in the USA. Every print is still chosen because we'd hang it ourselves.
          </p>
          <p>Thanks for being here.</p>
          <p className="font-semibold text-foreground italic">— Marcus & James, Co-Founders</p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-semibold text-foreground text-center mb-14"
          >
            What We Stand For
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 border border-border"
              >
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-3xl sm:text-4xl font-display font-semibold text-foreground">{s.value}</span>
              <p className="text-sm font-body text-muted-foreground mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default About;
