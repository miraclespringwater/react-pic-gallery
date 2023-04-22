import { useEffect, useRef, useState } from "react";
import searchPhotos from "./api/searchPhotos";
import Thumb from "./components/Thumb";

const App = () => {
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await searchPhotos(value);
    console.log(results);
    setPhotos(results);
  };

  const ref = useRef();

  const imageThumbnails = photos.map((photo) => {
    return <Thumb key={photo.id} photo={photo} />;
  });

  // Hack to get useScroll in gallery images to
  // update the scroll progress when all images
  // are loaded
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new CustomEvent("scroll"));
    });

    observer.observe(ref.current);
  }, []);

  return (
    <div className="wrapper">
      <header className="header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </header>

      <div className="gallery" ref={ref}>
        {imageThumbnails}
      </div>
    </div>
  );
};

export default App;
