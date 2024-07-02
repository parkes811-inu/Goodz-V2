import api from "../axios";

// 댓글 조회
export const list = (postNo) => api.get(`/cmmt/${postNo}`)

// 댓글 등록

// 댓글 삭제

