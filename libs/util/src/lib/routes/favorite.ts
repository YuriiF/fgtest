import { Response, Request } from 'miragejs';
import { handleError } from '../errors/handle-error';
import { Favorite, User } from '@fgtest/stock/interfaces';

import dayjs from 'dayjs';

export const create = (
  schema: any,
  req: Request,
): { user: User; favorite: Favorite } | Response => {
  try {
    const { stockCode, userId } = JSON.parse(
      req.requestBody,
    ) as Partial<Favorite>;
    const exUser = schema.users.findBy({ id: userId });

    if (!exUser) {
      return handleError(null, 'No such user exists.');
    }

    const now = dayjs().format();
    const favorite = exUser.createFavorite({
      stockCode,
      createdAt: now,
      updatedAt: now,
    });

    return {
      user: {
        ...exUser.attrs,
      },
      favorite: favorite.attrs,
    };
  } catch (error) {
    return handleError(error, 'Failed to create Favorite.');
  }
};

export const updateFavorite = (
  schema: any,
  req: Request,
): Favorite | Response => {
  try {
    const favorite = schema.favorites.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Favorite>;
    const now = dayjs().format();
    favorite.update({
      ...data,
      updatedAt: now,
    });
    return favorite.attrs as Favorite;
  } catch (error) {
    return handleError(error, 'Failed to update Favorite.');
  }
};

export const getFavorites = (
  schema: any,
  req: Request,
): Favorite[] | Response => {
  try {
    const user = schema.users.find(req.params.id);
    return user.favorite as Favorite[];
  } catch (error) {
    return handleError(error, 'Could not get user favorites.');
  }
};
