import { useEffect, useRef, useState } from "react";
import searchPhotos from "./api/searchPhotos";
import Thumb from "./components/Thumb";

const App = () => {
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await searchPhotos(value);
    setPhotos(results);
  };

  const ref = useRef();

  const imageThumbnails = photos.map((photo) => {
    return <Thumb key={photo.id} photo={photo} />;
  });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new CustomEvent("scroll"));
    });

    observer.observe(ref.current);
  }, []);

  return (
    <div>
      <header style={headerStyle}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </header>

      <div ref={ref} style={gridStyle}>
        {imageThumbnails}
      </div>
    </div>
  );
};

const gridStyle = {
  marginTop: "50px",
  width: "100%",
  columns: "6 200px",
  columnGap: "5px",
};

const headerStyle = {
  zIndex: 1000,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  top: 0,
  height: "50px",
  backgroundColor: "#ffffff99",
  backdropFilter: "blur(2em)",
};

export default App;
