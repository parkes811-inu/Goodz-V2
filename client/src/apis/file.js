import api from "./axios";

// 파일 등록
export const fileInsert = (formData) => api.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

