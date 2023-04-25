import { useState } from "react";

const Search = ({ setQuery, setPhotos }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      setPhotos([]);
    }
    setQuery({ term: value, page: 1 });
  };
  return (
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
  );
};

export default Search;
