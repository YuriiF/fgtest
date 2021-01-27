import React from 'react';
import { render } from '@testing-library/react';

import StockList from './StockList';

describe('StockList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StockList />);
    expect(baseElement).toBeTruthy();
  });
});
