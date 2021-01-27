import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import stock from 'libs/util/src/lib/axios/stock';

export const STOCK_CHART_FEATURE_KEY = 'stockChart';

interface StockChartState {
  activeStockId: string | null;
}

const initialState: StockChartState = {
  activeStockId: null,
};

const stockChartSlice = createSlice({
  name: STOCK_CHART_FEATURE_KEY,
  initialState,
  reducers: {
    setActiveStockId(state, { payload }: PayloadAction<string>) {
      state.activeStockId = payload;
    },
  },
});

export const stockChartReducer = stockChartSlice.reducer;

export const { setActiveStockId } = stockChartSlice.actions;

export const getStockChartState = (rootState: unknown): StockChartState =>
  rootState[STOCK_CHART_FEATURE_KEY];

export const selectActiveStockId = createSelector(
  getStockChartState,
  (state) => state.activeStockId,
);

export const stockChartActions = stockChartSlice.actions;
