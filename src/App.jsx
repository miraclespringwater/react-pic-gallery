import { useState } from "react";
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

  const imageThumbnails = photos.map((photo) => {
    return <Thumb key={photo.id} photo={photo} />;
  });

  return (
    <div>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </header>

      <div>{imageThumbnails}</div>
    </div>
  );
};

export default App;
