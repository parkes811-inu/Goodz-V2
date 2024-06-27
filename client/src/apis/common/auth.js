import api from '../axios';

// 로그인
export const login = (username, password) => api.get(`/login?username=${username}&password=${password}`)

// 사용자 정보 (요청을 보내면 유저정보를 찾아 보내줌)
export const info = () => api.get(`/users/info`)

// 회원 가입 
export const join = (data) => api.post(`/users`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/users`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/users/${userId}`)
