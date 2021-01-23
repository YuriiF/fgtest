/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'miragejs';
import { handleError } from '../server';
import { User } from '@fgtest/stock/interfaces';
import { nanoid } from 'nanoid';

const generateToken = () => nanoid();

export interface UserResponse {
  token: string;
  user: User;
}

export const signin = (schema: any, req: Request): UserResponse | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });

  if (!user) {
    return handleError(null, 'Username is incorrect');
  }

  if (password !== user.password) {
    return handleError(null, 'Wrong password');
  }

  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};

export const signup = (schema: any, req: Request): UserResponse | Response => {
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
  signin,
  signup,
};
