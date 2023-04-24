import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import searchPhotos from "./api/searchPhotos";
import GalleryItem from "./components/GalleryItem";
import Masonry from "@mui/lab/Masonry";

const App = () => {
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState({ term: "", page: 1 });
  const [numColumns, setNumColumns] = useState(4);

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

  const imageThumbnails = photos.map((photo) => {
    return <GalleryItem key={photo.id} photo={photo} />;
  });

  const handleResize = ([e]) => {
    setNumColumns(Math.floor(e.contentRect.width / 250));
    window.dispatchEvent(new CustomEvent("scroll"));
  };

  const onGalleryRefChange = useCallback((node) => {
    if (node) {
      const observer = new ResizeObserver(handleResize);
      observer.observe(node);
    }
  }, []);

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

      <div className="gallery" ref={onGalleryRefChange}>
        <div className="gallery__content">
          <Masonry columns={numColumns} spacing={2}>
            {imageThumbnails}
          </Masonry>
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

export default App;
