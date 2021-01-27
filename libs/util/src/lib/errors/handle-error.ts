import { Response } from 'miragejs';

export const handleError = (error: unknown, message = 'Error ocurred') => {
  return new Response(400, undefined, {
    data: {
      message,
      error: true,
    },
  });
};
