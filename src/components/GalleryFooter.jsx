const GalleryFooter = ({ photos, setQuery }) => {
  const handleClick = () => {
    setQuery((oldQuery) => {
      const newQuery = { ...oldQuery, page: oldQuery.page + 1 };
      return newQuery;
    });
  };
  return (
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
  );
};

export default GalleryFooter;
