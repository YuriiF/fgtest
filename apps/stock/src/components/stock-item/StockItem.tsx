import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Checkbox } from 'rendition';
import type {} from 'styled-components/cssprop';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../store/store';

import {
  selectAllStock,
  stockActions,
} from '../../app/features/stock/stock.slice';

const FavoriteRow = ({ favorite }) => {
  const dispatch = useAppDispatch();

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
        checked={favorite?.isFavorite}
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
