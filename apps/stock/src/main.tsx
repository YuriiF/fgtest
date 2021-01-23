import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createServer } from '@fgtest/util';

/** Custom imoprts */
import App from './app/App';

const { NODE_ENV: isDev } = process.env;

if (isDev === 'development') {
  createServer();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
