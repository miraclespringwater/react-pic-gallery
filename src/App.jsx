import { useCallback, useEffect, useRef, useState } from "react";
import searchPhotos from "./api/searchPhotos";
import Thumb from "./components/Thumb";

const App = () => {
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState({ term: "", page: 1 });
  const [numColumns, setNumColumns] = useState(4);
  const [loading, setLoading] = useState(false);

  const loaderRefs = useRef([]);

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
    setLoading(true);
    const results = await searchPhotos(query);
    setPhotos((oldPhotos) => {
      if (query.page === 1) {
        return results;
      }
      return [...oldPhotos, ...results];
    });
    setLoading(false);
  }, [query]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Hack to get useScroll in gallery images to
  // update the scroll progress when all images
  // are loaded
  const ref = useRef();
  useEffect(() => {
    const observer = new ResizeObserver(([e]) => {
      setNumColumns(Math.floor(e.contentRect.width / 250));
      window.dispatchEvent(new CustomEvent("scroll"));
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const imageThumbnails = photos.map((photo) => {
    return <Thumb key={photo.id} photo={photo} />;
  });

  const columns = genGalleryColumns(imageThumbnails, numColumns);

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
        <div className="gallery__content">
          <div className="gallery__row">
            {columns.map((col, i) => {
              return (
                <div key={i} className="gallery__column">
                  <div
                    ref={(el) => (loaderRefs[i] = el)}
                    className="gallery__column-content"
                  >
                    {col}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

const genGalleryColumns = (images, totalColumns) => {
  const columns = Array.from(Array(totalColumns), () => []);
  const refs = [...columns];

  let currentColumn = 0;
  let i = 0;
  while (i < images.length) {
    columns[currentColumn].push(images[i]);

    if (currentColumn < totalColumns - 1) {
      currentColumn++;
    } else {
      currentColumn = 0;
    }

    i++;
  }

  return columns;
};
export default App;
