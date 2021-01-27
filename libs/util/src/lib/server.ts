import { Server, Model, Factory, belongsTo, hasMany } from 'miragejs';
import { login, signup } from './routes/user';
import * as favorite from './routes/favorite';

export const createServer = (env?: string): Server => {
  return new Server({
    environment: env ?? 'development',

    models: {
      favorite: Model.extend({
        user: belongsTo(),
      }),
      user: Model.extend({
        favorite: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: 'admin',
        password: 'admin',
        email: 'admin@example.com',
      }),
      favorite: Factory.extend({
        stockCode: 'GOOG',
        userId: '1',
      }),
    },

    seeds: (server) => {
      server.create('user');
      server.create('favorite');
    },

    routes(): void {
      this.urlPrefix = 'https://stock.app';

      /** Pass through finnhub api URI Origin */
      this.passthrough('https://finnhub.io/api/**');

      this.post('/auth/login', login);
      this.post('/auth/signup', signup);

      this.get('/favorites/:id', favorite.getFavorites);
      this.post('/favorites/', favorite.create);
      this.put('/favorites/:id', favorite.updateFavorite);
    },
  });
};
