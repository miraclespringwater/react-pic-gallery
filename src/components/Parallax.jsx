import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Parallax = ({ children, target }) => {
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const physics = { damping: 30, mass: 0.27, stiffness: 500 };

  return (
    <motion.div style={{ y: useSpring(y, physics) }}>{children}</motion.div>
  );
};

export default Parallax;
