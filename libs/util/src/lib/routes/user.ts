import { Response, Request } from 'miragejs';
import { handleError } from '../errors/handle-error';
import { User } from '@fgtest/stock/interfaces';
import { nanoid } from 'nanoid';

const generateToken = () => nanoid();

export interface AuthResponse {
  token: string;
  user: User;
}

export const login = (schema: any, req: Request): AuthResponse | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });

  if (!user) {
    return handleError(null, 'No user with that username exists');
  }

  if (password !== user.password) {
    return handleError(null, 'Password is incorrect');
  }

  const token = generateToken();

  return {
    user: user.attrs as User,
    token,
  };
};

export const signup = (schema: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const exUser = schema.users.findBy({ username: data.username });
  if (exUser) {
    return handleError(null, 'A user with that username already exists.');
  }
  const user = schema.users.create(data);
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};

export default {
  login,
  signup,
};
