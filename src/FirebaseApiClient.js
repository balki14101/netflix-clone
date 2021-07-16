import axios from 'axios';

const FirebaseApiClient = axios.create({
  baseURL:
    'https://firebasestorage.googleapis.com/v0/b/sample-a8754.appspot.com/o/',
});

FirebaseApiClient.interceptors.response.use(
  response => response.data,
  err => {
    return Promise.reject(err);
  },
);

export default FirebaseApiClient;
