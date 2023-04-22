import api from "./api";

const searchPhotos = async (term) => {
  const response = await api.get("/search/photos", {
    params: {
      query: term,
      per_page: 30,
    },
  });

  return response.data.results;
};

export default searchPhotos;
