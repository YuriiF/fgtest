import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StockItemProps {}

const StyledStockItem = styled.div`
  color: pink;
`;

export function StockItem(props: StockItemProps) {
  return (
    <StyledStockItem>
      <h1>Welcome to StockItem!</h1>
    </StyledStockItem>
  );
}

export default StockItem;
