import { combineReducers } from '@reduxjs/toolkit';

import { authReducer, AUTH_FEATURE_KEY } from '../auth/auth.slice';
import { userReducer, USER_FEATURE_KEY } from '../user/user.slice';
import { stockReducer, STOCK_FEATURE_KEY } from './stock/stock.slice';

import {
  stockChartReducer,
  STOCK_CHART_FEATURE_KEY,
} from './stock/stockChart.slice';
import favoritesReducer from './favorite/favoritesSlice';

const rootReducer = combineReducers({
  [AUTH_FEATURE_KEY]: authReducer,
  [USER_FEATURE_KEY]: userReducer,
  [STOCK_FEATURE_KEY]: stockReducer,
  [STOCK_CHART_FEATURE_KEY]: stockChartReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
