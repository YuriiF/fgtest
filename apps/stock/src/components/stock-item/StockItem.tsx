import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'rendition';
import type {} from 'styled-components/cssprop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regIconHeart } from '@fortawesome/free-regular-svg-icons';

import { useAppDispatch } from '../../store/store';
import {
  selectAllStock,
  stockActions,
} from '../../app/features/stock/stock.slice';
import styled from 'styled-components';

const StockTitle = styled.div`
  display: inline-block;
  width: 60px;
  min-width: 60px;
  padding: 2px 16px 2px 0px;
`;

const Favorite = ({ children, stock, isFavorite }) => {
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    if (id) {
      dispatch(
        stockActions.update({
          id,
          changes: { isFavorite: !isFavorite },
        }),
      );
    }
  };

  return (
    <div>
      <StockTitle>{children}</StockTitle>
      <FontAwesomeIcon
        icon={isFavorite ? faHeart : regIconHeart}
        color={'red'}
        style={{ cursor: 'pointer' }}
        onClick={() => handleClick(stock?.id)}
      />
    </div>
  );
};

export function StockItem() {
  const allStocks = useSelector(selectAllStock);

  const favoriteRows = allStocks.map((stock) => {
    return (
      <Favorite stock={stock} isFavorite={stock.isFavorite}>
        {stock.id}
      </Favorite>
    );
  });

  return (
    <Card
      title="Favorites Stocks"
      rows={favoriteRows}
      css={`
        border-radius: 4px;
        margin-top: 16px;
      `}
    ></Card>
  );
}

export default StockItem;
