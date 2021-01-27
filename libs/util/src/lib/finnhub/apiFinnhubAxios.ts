import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { showAlert } from '../alert/show-alert';

const apiFinnhubAxios: AxiosInstance = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
});

apiFinnhubAxios.defaults.headers.common['X-Finnhub-Token'] = 'c0770i748v6pan1qdpe0';
apiFinnhubAxios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
apiFinnhubAxios.defaults.headers.post['Content-Type'] = 'application/json';

apiFinnhubAxios.interceptors.response.use(
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
        showAlert(response.data?.data?.message, 'error');
        return null;
      }
    } else if (request) {
      showAlert('Request to finnhub failed. Please try again.', 'error');
      return null;
    }

    return Promise.reject(error);
  },
);

export default apiFinnhubAxios;
