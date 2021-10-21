import React from 'react';
import { render } from '@testing-library/react';

import NeuralNetworkSettings from './NeuralNetworkSettings';

describe('NeuralNetworkSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NeuralNetworkSettings />);
    expect(baseElement).toBeTruthy();
  });
});
