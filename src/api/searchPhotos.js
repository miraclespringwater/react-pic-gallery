import api from "./api";

const searchPhotos = async (term) => {
  const response = await api.get("/search/photos", {
    params: {
      query: term,
    },
  });

  return response.data.results;
};

export default searchPhotos;
