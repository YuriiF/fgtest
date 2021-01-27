import { fetchStock, stockAdapter, stockReducer } from './stock.slice';

describe('stock reducer', () => {
  it('should handle initial state', () => {
    const expected = stockAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(stockReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchStocks', () => {
    let state = stockReducer(undefined, fetchStock.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      }),
    );

    state = stockReducer(state, fetchStock.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      }),
    );

    state = stockReducer(
      state,
      fetchStock.rejected(new Error('Uh oh'), null, null),
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      }),
    );
  });
});
