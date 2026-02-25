import { motion, useScroll } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gold origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
