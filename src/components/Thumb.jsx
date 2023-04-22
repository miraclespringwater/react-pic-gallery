import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Thumb = ({ photo }) => {
  const [isInView, setIsInView] = useState(false);

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div style={containerStyle} ref={ref}>
      <motion.div style={{ y }}>
        <motion.div
          initial={false}
          animate={isInView ? styleWhenInView : styleWhenOutOfView}
          viewport={{ once: false, margin: "20px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
        >
          <img
            width="200px"
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
          />
          <span>{photo.alt_description}</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const containerStyle = {
  transform: "translateY(100px)",
};

const styleWhenInView = {
  y: 0,
  opacity: 1,
  filter: "blur(0em)",
};

const styleWhenOutOfView = {
  y: 20,
  opacity: 0,
  filter: "blur(1em)",
};

export default Thumb;
