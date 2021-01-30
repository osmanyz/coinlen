import axios from 'axios';
import config from '../config.json';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
};

const userToken = localStorage.getItem('userToken');
if (userToken) {
  headers.Authorization = `Bearer ${userToken}`;
}

const api = axios.create({
  baseURL: config[process.env.NODE_ENV],
  headers: headers,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 403 && window.location.pathname !== '/login') {
      localStorage.clear();

      return (window.location.href = '/login');
    }

    return Promise.reject(error.response);
  }
);

export default api;
