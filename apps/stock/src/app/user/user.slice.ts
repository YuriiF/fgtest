import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '@fgtest/stock/interfaces';
import { apiAxios } from '@fgtest/util';
import { RootState } from '../features/rootReducer';

export const USER_FEATURE_KEY = 'user';

export interface UserState extends User {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export interface UserData {
  data: User;
  path: string;
}

/**
 * Export an effect using createAsyncThunk from
 */
export const setUser = createAsyncThunk(
  'user/fetchStatus',
  async (userData: UserData) => {
    const response = await apiAxios.post<User, any>(
      userData.path,
      userData.data,
    );
    return response;
  },
);

export const initialUserState: UserState = {
  loadingStatus: 'not loaded',
  error: null,
  id: '',
  username: null,
  email: '',
  password: '',
  favoriteIds: [],
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state: UserState, action) => {
        state.loadingStatus = 'loading';
      })
      .addCase(setUser.fulfilled, (state: UserState, { payload }) => {
        return (state = {
          loadingStatus: 'loaded',
          error: null,
          ...payload?.user,
        });
      })
      .addCase(setUser.rejected, (state: UserState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export const getUserState = (rootState: RootState): UserState =>
  rootState[USER_FEATURE_KEY];
