import { useCallback, useEffect, useRef, useState } from "react";
import searchPhotos from "./api/searchPhotos";
import Thumb from "./components/Thumb";

const App = () => {
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState({ term: "", page: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      setPhotos([]);
    }
    setQuery({ term: value, page: 1 });
  };

  const handleClick = () => {
    setQuery((oldQuery) => {
      const newQuery = { ...oldQuery, page: oldQuery.page + 1 };
      return newQuery;
    });
  };

  const fetchPhotos = useCallback(async () => {
    //TODO: use form validation
    if (query.term === "") {
      return;
    }
    const results = await searchPhotos(query);
    setPhotos((oldPhotos) => {
      if (query.page === 1) {
        return results;
      }
      return [...oldPhotos, ...results];
    });
  }, [query]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Hack to get useScroll in gallery images to
  // update the scroll progress when all images
  // are loaded
  const ref = useRef();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new CustomEvent("scroll"));
    });

    observer.observe(ref.current);
  }, []);

  const imageThumbnails = photos.map((photo) => {
    return <Thumb key={photo.id} photo={photo} />;
  });

  return (
    <div className="wrapper">
      <header className="header">
        <form className="search" onSubmit={handleSubmit}>
          <input
            className="search__input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </header>

      <div className="gallery" ref={ref}>
        <div className="gallery__content">{imageThumbnails}</div>
        <div className="gallery__footer">
          <p className="gallery__footer-text">
            {!!photos.length && "This is the end of the gallery."}
          </p>
          {!!photos.length && (
            <button className="button" onClick={handleClick}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
