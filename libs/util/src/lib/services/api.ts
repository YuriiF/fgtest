import { stringify } from 'query-string';
import merge from 'lodash/merge';
import { apiUrl, finnhubAPIKey } from './api-config';

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error: any = new Error(`${response.status} ${response.statusText}`);
  error.response = response;
  throw error;
};

export const parseJSON = (response) => response.json();

export const parseSettings = ({
  method = 'get',
  data,
  locale,
  ...otherSettings
}: any = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
    'X-Finnhub-Token': finnhubAPIKey,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
  const settings = merge(
    {
      body: data ? JSON.stringify(data) : undefined,
      method,
      headers,
    },
    otherSettings,
  );
  return settings;
};

export const parseEndpoint = (
  endpoint: string | string[],
  params: Record<string, any>,
) => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : '';
  return `${url}${querystring}`;
};

const api: any = {};

api.request = (endpoint: string, { params, ...settings }: any = {}) =>
  fetch(parseEndpoint(endpoint, params), parseSettings(settings))
    .then(checkStatus)
    .then(parseJSON);

['delete', 'get'].forEach((method) => {
  api[method] = (endpoint: {}, settings: {}) =>
    api.request(endpoint, { method, ...settings });
});

['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint: string, data: {}, settings: {}) =>
    api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint: string, settings: {}) {
    return api.request(endpoint, merge({}, this.settings, settings));
  },

  post(endpoint: string, data: {}, settings: {}) {
    return this.request(endpoint, { method: 'post', data, ...settings });
  },

  get(endpoint: string, settings: {}) {
    return this.request(endpoint, { method: 'get', ...settings });
  },

  put(endpoint: string, data: {}, settings: {}) {
    return this.request(endpoint, { method: 'put', data, ...settings });
  },

  patch(endpoint: string, data: {}, settings: {}) {
    return this.request(endpoint, { method: 'patch', data, ...settings });
  },

  delete(endpoint: string, settings: {}) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },
});

export default api;
