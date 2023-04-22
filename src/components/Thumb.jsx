import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Thumb = ({ photo }) => {
  const [isInView, setIsInView] = useState(false);

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="gallery__item" ref={ref}>
      <motion.div style={{ y }}>
        <motion.div
          initial={false}
          animate={isInView ? styleWhenInView : styleWhenOutOfView}
          viewport={{ once: false, margin: "20px" }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
        >
          <div className="gallery__card">
            <div className="gallery__image-box">
              <img
                className="gallery__image"
                key={photo.id}
                src={photo.urls.thumb}
                alt={photo.alt_description}
              />
            </div>
            <span className="gallery__image-caption">
              {photo.alt_description}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

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

export default Thumb;
