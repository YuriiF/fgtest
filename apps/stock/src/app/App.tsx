import React from 'react';

import styled from 'styled-components';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';

const StyledApp = styled.div`
  font-family: sans-serif;
  margin: 50px auto;

  main {
    padding: 0 36px;
  }

  h1 {
    text-align: center;
    padding: 1rem;
    font-size: 24px;
  }
`;

export function App() {
  return (
    <StyledApp>
      <main>
        <h1>App</h1>
      </main>
    </StyledApp>
  );
}

export default App;
