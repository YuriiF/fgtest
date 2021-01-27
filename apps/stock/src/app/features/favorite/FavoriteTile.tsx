import React, { FC, useState } from 'react';
import { Favorite } from '@fgtest/stock/interfaces';
import { apiAxios as http } from '@fgtest/util';
import { updateFavorite } from './favoritesSlice';
import { showAlert } from '@fgtest/util';
import { Link } from 'react-router-dom';

/** Custom imports */
import { useAppDispatch } from '../../../store/store';

interface Props {
  favorite: Favorite;
}

const buttonStyle: React.CSSProperties = {
  fontSize: '0.7em',
  margin: '0 0.5em',
};

const FavoriteTile: FC<Props> = (props) => {
  const [favorite, setFavorite] = useState(props.favorite);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const saveChanges = () => {
    http
      .put<Favorite, Favorite>(`/favorites/${favorite.id}`, favorite)
      .then((favorite) => {
        if (favorite) {
          dispatch(updateFavorite(favorite));
          showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="favorite-tile">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <input
            value={favorite.stockCode}
            onChange={(e) => {
              setFavorite({
                ...favorite,
                stockCode: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{favorite.stockCode}</span>
        )}
      </h2>

      <div style={{ display: 'flex' }}>
        <Link to={`favorite/${favorite.id}`} style={{ width: '100%' }}>
          <button className="secondary" style={buttonStyle}>
            View all &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavoriteTile;
