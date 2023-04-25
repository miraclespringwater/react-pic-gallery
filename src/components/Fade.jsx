import { motion } from "framer-motion";
import { useState } from "react";

const styleWhenInView = {
  y: 0,
  opacity: 1,
  scale: 1,
  filter: "blur(0em)",
};

const styleWhenOutOfView = {
  y: 20,
  scale: 0.9,
  opacity: 0,
  filter: "blur(.5em)",
};

const Fade = ({ children }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={isInView ? styleWhenInView : styleWhenOutOfView}
      viewport={{ once: true, margin: "20px" }}
      transition={{ duration: 0.3, delay: 0.1 }}
      onViewportEnter={() => setIsInView(true)}
    >
      {children}
    </motion.div>
  );
};

export default Fade;
