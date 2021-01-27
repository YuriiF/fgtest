/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rootReducer from '../app/features/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('../app/features/rootReducer', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require('../app/features/rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
