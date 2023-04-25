import { useRef } from "react";
import Parallax from "./Parallax";
import Fade from "./Fade";

const GalleryItem = ({ photo }) => {
  const ref = useRef();

  return (
    <div className="gallery__item" ref={ref}>
      <Parallax target={ref}>
        <Fade>
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
        </Fade>
      </Parallax>
    </div>
  );
};

export default GalleryItem;
