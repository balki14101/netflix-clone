import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

ApiClient.interceptors.request.use(config => {
  config.params = {
    api_key: '628f811dd14b86f8fea17c431c364235',
    language: 'en-US',
    ...config.params,
  };
  return config;
});

ApiClient.interceptors.response.use(
  response => response.data,
  err => {
    return Promise.reject(err);
  }
);

export default ApiClient;
