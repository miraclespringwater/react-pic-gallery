import { useCallback, useEffect, useState } from "react";
import searchPhotos from "./api/searchPhotos";
import Search from "./components/Search";
import Gallery from "./components/Gallery";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState({ term: "", page: 1 });

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

  return (
    <div className="wrapper">
      <Search setQuery={setQuery} />
      <Gallery setQuery={setQuery} photos={photos} />
    </div>
  );
};

export default App;
