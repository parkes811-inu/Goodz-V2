import api from "../axios";

export const searchItems  = (searchKeyWord) => api.get(`/tag?keyword=${encodeURIComponent(searchKeyWord)}`);