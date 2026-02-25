import { motion } from "framer-motion";
import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 5–7 business days. Express shipping (2–3 days) is available at checkout. All canvases are made to order and ship from the USA." },
  { q: "What sizes are available?", a: 'We offer four standard sizes: 12×16", 18×24", 24×36", and 36×48". Custom sizes are available upon request.' },
  { q: "Can I order a custom print?", a: "Yes! You can upload your own photo or artwork and we'll print it on museum-quality canvas. Contact us at hello@canvasculture.com for custom orders." },
  { q: "What is your canvas made of?", a: "Our canvases are made from premium 340gsm cotton-poly blend, printed with archival-quality inks rated for 100+ years. Each canvas is hand-stretched over kiln-dried solid pine stretcher bars." },
  { q: "Do you ship internationally?", a: "Currently we ship within the United States and Canada. International shipping is coming soon — sign up for our newsletter to be notified." },
  { q: "What if my order arrives damaged?", a: "Simply take a photo and email us at hello@canvasculture.com. We'll ship a replacement immediately at no cost to you." },
  { q: "How do I hang my canvas?", a: "Every canvas arrives ready to hang with pre-installed hanging hardware. Simply find your spot, hammer in a nail, and hang. No additional framing needed." },
  { q: "Can I return a custom order?", a: "Custom orders are made specifically for you, so they're non-refundable. However, if there's an issue with print quality or damage, we'll make it right." },
];

const FAQ = () => (
  <div className="min-h-screen flex flex-col">
    <PromoBanner />
    <Header />
    <CartDrawer />

    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-display font-semibold text-foreground mb-4"
      >
        Frequently Asked Questions
      </motion.h1>
      <p className="text-muted-foreground font-body mb-12">Got questions? We've got answers.</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-body text-sm font-medium text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </main>

    <Footer />
  </div>
);

export default FAQ;
