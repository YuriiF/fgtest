import React from 'react';
import { render } from '@testing-library/react';

import StockItem from './StockItem';

describe('StockItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StockItem />);
    expect(baseElement).toBeTruthy();
  });
});
