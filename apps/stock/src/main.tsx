/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createServer } from '@fgtest/util';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Provider as ThemeProvider } from 'rendition';

/** Custom imoprts */
import App from './app/App';
import store from './store/store';

/** CSS imports */

const { NODE_ENV: isDev } = process.env;

if (isDev === 'development') {
  createServer();
}

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const load = (Component = App) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <Component />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

load(App);

/**
 * (module as any).hot fixes TypeScript error.
 */
if ((module as any).hot) {
  (module as any).hot.accept(['./app/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const App = require('./app/App').default;
    load(App);
  });
}
