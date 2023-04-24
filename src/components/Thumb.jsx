import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Thumb = ({ photo, ...rest }) => {
  const [isInView, setIsInView] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const getEstimateSpanSize = (size) => {
    return size > 240 ? 2 : 1;
  };

  const handleLoad = ({ target: img }) => {
    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  };

  return (
    <div
      style={{
        gridColumnEnd: `span ${getEstimateSpanSize(dimensions.height)}`,
        gridRowEnd: `span ${getEstimateSpanSize(dimensions.width)}`,
      }}
      className="gallery__item"
      ref={ref}
    >
      <motion.div style={{ y }}>
        <motion.div
          initial={false}
          animate={isInView ? styleWhenInView : styleWhenOutOfView}
          viewport={{ once: true, margin: "20px" }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onViewportEnter={() => setIsInView(true)}
        >
          <div className="gallery__card">
            <div className="gallery__image-box">
              <img
                className="gallery__image"
                key={photo.id}
                src={photo.urls.thumb}
                alt={photo.alt_description}
                onLoad={handleLoad}
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
