import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const apiAxios: AxiosInstance = axios.create({
  baseURL: 'https://stock.app',
});

apiAxios.defaults.headers.post['Content-Type'] = 'application/json';

apiAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },

  (error: AxiosError) => {
    const {
      response,
      request,
    }: {
      response?: AxiosResponse;
      request?: XMLHttpRequest;
    } = error;

    if (response) {
      if (response.status >= 400 && response.status < 500) {
        console.log('error', response.data?.data?.message);
        return null;
      }
    } else if (request) {
      console.log('Request failed. Try again later.', 'error');
      return null;
    }

    return Promise.reject(error);
  },
);

export default apiAxios;
