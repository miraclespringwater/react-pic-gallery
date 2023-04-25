import { useCallback, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import GalleryItem from "./GalleryItem";
import GalleryFooter from "./GalleryFooter";

const Gallery = ({ photos, setQuery }) => {
  const [numColumns, setNumColumns] = useState(4);

  const handleResize = ([e]) => {
    setNumColumns(Math.floor(e.contentRect.width / 250));
    window.dispatchEvent(new CustomEvent("scroll"));
  };

  const imageThumbnails = photos.map((photo) => {
    return <GalleryItem key={photo.id} photo={photo} />;
  });

  const onGalleryRefChange = useCallback((node) => {
    if (node) {
      const observer = new ResizeObserver(handleResize);
      observer.observe(node);
    }
  }, []);

  return (
    <div className="gallery" ref={onGalleryRefChange}>
      <div className="gallery__content">
        <Masonry columns={numColumns} spacing={2}>
          {imageThumbnails}
        </Masonry>
      </div>
      <GalleryFooter photos={photos} setQuery={setQuery} />
    </div>
  );
};

export default Gallery;
