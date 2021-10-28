import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

import { RootState } from '../rootReducer';
import { apiAxios as http } from '@fgtest/util';
import { Favorite, User } from '@fgtest/stock/interfaces';
import { addFavorite } from './favoritesSlice';
import { setUser } from '../../user/user.slice';
import FavoriteTile from './FavoriteTile';
import { Route, Switch } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';

const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        http.get<null, Favorite[]>(`favorites/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addFavorite(sortedByUpdatedAt));
          }
        });
      }
    };

    fetchFavorites();
  }, [dispatch, user]);

  const createFavorite = async () => {
    const result = await (Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    }).queue([
      {
        titleText: 'Favorite title',
        input: 'text',
      },
      {
        titleText: 'Private or public favorite?',
        input: 'radio',
        inputOptions: {
          private: 'Private',
          public: 'Public',
        },
        inputValue: 'private',
      },

    ])) as any;

    if (result.value) {
      const { value } = result;
      const { favorite, user: _user } = await http.post<
        Partial<Favorite>,
        { favorite: Favorite; user: User }
      >('/favorites/', {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });

      if (favorite && user) {
        dispatch(addFavorite([favorite] as Favorite[]));
        dispatch(addFavorite([favorite] as Favorite[]));

        return Swal.fire({
          titleText: 'All done!',
          confirmButtonText: 'OK!',
        });
      }
    }
    Swal.fire({
      titleText: 'Cancelled',
    });
  };

  return (
    <div style={{ padding: '1em 0.4em' }}>
      <Switch>
        <Route path="/">
          <button onClick={createFavorite}>Create New</button>
          {favorites.map((favorite, idx) => (
            <FavoriteTile key={idx} favorite={favorite} />
          ))}
        </Route>
      </Switch>
    </div>
  );
};

export default Favorites;
