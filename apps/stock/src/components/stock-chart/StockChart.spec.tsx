import React from 'react';
import { render } from '@testing-library/react';

import StockChart from './StockChart';

describe('StockChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StockChart />);
    expect(baseElement).toBeTruthy();
  });
});
