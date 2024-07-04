import api from "../axios";

// 전체 게시글 조회
export const list = () => api.get("/styles");

// 게시글 상세
export const select = (postNo) => api.get(`/styles/${postNo}`);

// 게시글 작성 처리

// 게시글 수정 처리

// 게시글 삭제 처리

// 유저 프로필 조회
export const setProfile = (nickname) => api.get(`/styles/user/@${nickname}`);


