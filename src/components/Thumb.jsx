import { motion } from "framer-motion";
import { useState } from "react";

const styleWhenInView = {
  y: 0,
  opacity: 1,
};

const styleWhenOutOfView = {
  y: 200,
  opacity: 0,
};

const Thumb = ({ photo }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <div>
      <motion.div
        initial={false}
        animate={isInView ? styleWhenInView : styleWhenOutOfView}
        viewport={{ once: false, margin: "20px" }}
        transition={{ duration: 1, delay: 0.3 }}
        onViewportEnter={() => setIsInView(true)}
        onViewportLeave={() => setIsInView(false)}
      >
        <img
          key={photo.id}
          src={photo.urls.thumb}
          alt={photo.alt_description}
        />
      </motion.div>
    </div>
  );
};

export default Thumb;
