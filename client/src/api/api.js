import axios from 'axios';

export const makeApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 5000,
    withCredentials: true
  });
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
  return api;
};
