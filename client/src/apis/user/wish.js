import api from "../axios";

// 관심 리스트 조회 - 유저기준
export const listById = (parentTable, userId) => api.get(`/wishes/parentTable=${parentTable}&userId=${userId}`);