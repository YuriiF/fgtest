import { stockAPI } from '@fgtest/util';
import { stockChartActions } from './stockChart.slice';
import { stocks } from './load-default-stock';

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const STOCK_FEATURE_KEY = 'stock';

export interface StockEntity {
  id: string;
  t: string;
  o: number;
  l: number;
  h: number;
  pc: number;
  c: number;
  changeFromLastDay: number;
  isActive: boolean;
  isFavorite: boolean;
}

export interface StockState extends EntityState<StockEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const stockAdapter = createEntityAdapter<StockEntity>({
  sortComparer: (a, b) => {
    return a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1;
  },
});

export const fetchStock = createAsyncThunk(
  'stock/fetchStatus',
  async (stockSymbol: any, thunkAPI) => {
    const { data } = await stockAPI.get('/quote', {
      params: {
        symbol: stockSymbol,
        token: 'c0770i748v6pan1qdpe0',
      },
    });

    if (data) {
      thunkAPI.dispatch(stockChartActions.setActiveStockId(stockSymbol));
    }

    return {
      ...data,
      id: stockSymbol,
      changeFromLastDay: (
        100 -
        (data.pc.toFixed(2) / data.c.toFixed(2)) * 100
      ).toFixed(2),
      isActive: true,
    };
  },
);
// @ts-ignore
export const initialStockState: StockState = stockAdapter.getInitialState({
  ...stocks,
});

export const stockSlice = createSlice({
  name: STOCK_FEATURE_KEY,
  initialState: initialStockState,
  reducers: {
    add: stockAdapter.addOne,
    remove: stockAdapter.removeOne,
    update: stockAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStock.pending, (state: StockState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchStock.fulfilled,
        (state: StockState, action: PayloadAction<StockEntity>) => {
          // stockAdapter.setAll(state, action.payload);
          console.log(state);
          console.log(action);
          stockAdapter.addOne(state, action.payload);
          state.loadingStatus = 'loaded';
        },
      )
      .addCase(fetchStock.rejected, (state: StockState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/**
 * Export reducer for store configuration.
 */
export const stockReducer = stockSlice.reducer;

/**
 * Export action creators to be dispatched.
 * For use with the `useDispatch` hook.
 */
export const stockActions = stockSlice.actions;

/**
 * Export selectors to query state.
 * For use with the `useSelector` hook.
 */
const { selectById, selectAll, selectEntities } = stockAdapter.getSelectors();

export const getStockState = (rootState: unknown): StockState =>
  rootState[STOCK_FEATURE_KEY];

export const selectAllStock = createSelector(getStockState, selectAll);

export const selectFavoritesStocks = createSelector(selectAllStock, (stocks) =>
  stocks.filter((item) => item.isFavorite),
);

export const selectStockEntities = createSelector(
  getStockState,
  selectEntities,
);
