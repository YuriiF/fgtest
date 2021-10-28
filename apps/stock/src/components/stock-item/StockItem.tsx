import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Checkbox } from 'rendition';
import type {} from 'styled-components/cssprop';

import {
  selectAllStock,
  selectFavoritesStocks,
  stockActions,
} from '../../app/features/stock/stock.slice';

import { useDispatch } from 'react-redux';

const FavoriteRow = ({ favorite }) => {
  const dispatch = useDispatch();

  const handleChange = (ev: { target: { id: string } }) => {
    const { id } = ev.target;

    if (id) {
      dispatch(
        stockActions.update({
          id,
          changes: { isFavorite: !favorite.isFavorite },
        }),
      );
    }
  };

  const check = favorite.isFavorite ? { checked: true } : '';

  return (
    <div>
      <Checkbox
        id={favorite.id}
        label={favorite?.id}
        onChange={handleChange}
        reverse
        css={`
          background-color: ${favorite.isFavorite ? 'yellow' : 'white'};
        `}
        {...check}
      />
    </div>
  );
};

export function StockItem() {
  const [stockRows, setStockRows] = useState([]);
  const allStocks = useSelector(selectAllStock);

  const rows = allStocks.map((item) => {
    return <FavoriteRow favorite={item} />;
  });

  return (
    <Card
      title="Favorites Stocks"
      rows={rows}
      css={`
        border-radius: 4px;
        margin-top: 16px;
      `}
    ></Card>
  );
}

export default StockItem;
