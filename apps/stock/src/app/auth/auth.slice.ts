import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _isEmpty from 'lodash/isEmpty';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    addToken(state, { payload }: PayloadAction<string>) {
      if (!_isEmpty(payload)) {
        state.token = payload;
      }
    },
    removeToken(state) {
      state.token = null;
    },
    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
});

/**
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer;

/**
 * Export action creators to be dispatched.
 * For use with the `useDispatch` hook.
 */
export const authActions = authSlice.actions;

/**
 * Export selectors to query state.
 * For use with the `useSelector` hook.
 */
export const getAuthState = (rootState: unknown): AuthState =>
  rootState[AUTH_FEATURE_KEY];

export const selectIsAuthenticated = createSelector(
  getAuthState,
  (auth) => auth.isAuthenticated,
);
