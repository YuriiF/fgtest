import React from 'react';
import { render } from '@testing-library/react';

import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchForm />);
    expect(baseElement).toBeTruthy();
  });
});
