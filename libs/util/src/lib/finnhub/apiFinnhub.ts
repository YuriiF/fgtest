const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'c0770i748v6pan1qdpe0';

export const finnhubClient = new finnhub.DefaultApi();
