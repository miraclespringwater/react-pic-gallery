import api from "./api";

const searchPhotos = async (query) => {
  const response = await api.get("/search/photos", {
    params: {
      query: query.term,
      per_page: 50,
      page: query.page,
    },
  });

  return response.data.results;
};

export default searchPhotos;
