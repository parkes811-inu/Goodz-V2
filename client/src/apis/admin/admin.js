import api from '../common/axios';

// 브랜드목록
export const list = () => axios.get("/boards")