import { motion } from "framer-motion";

export default function AnimatedPage({ children }) {

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}   // start state
      animate={{ opacity: 1, y: 0 }}    // enter animation
      exit={{ opacity: 0, y: -20 }}     // leave animation
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
