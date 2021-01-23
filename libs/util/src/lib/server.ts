import { Server, Model, Factory, Response } from 'miragejs';
import { signin, signup } from './routes/user';

export const handleError = (error: unknown, message = 'Error ocurred') => {
  return new Response(400, undefined, {
    data: {
      message,
      error: true,
    },
  });
};

export const createServer = (env?: string): Server => {
  return new Server({
    environment: env ?? 'development',

    models: {
      user: Model,
    },

    factories: {
      user: Factory.extend({
        username: 'admin',
        password: 'password',
        email: 'admin@example.com',
      }),
    },

    seeds: (server) => {
      server.create('user');
    },

    routes(): void {
      this.urlPrefix = 'https://stock.app';

      this.post('/user/signin', signin);
      this.post('/user/signup', signup);
    },
  });
};
