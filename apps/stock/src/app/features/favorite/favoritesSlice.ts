import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorite } from '@fgtest/stock/interfaces';

const favorites = createSlice({
  name: 'favorites',
  initialState: [] as Favorite[],
  reducers: {
    addFavorite(state, { payload }: PayloadAction<Favorite[]>) {
      const favoritesToSave = payload.filter((favorite) => {
        return state.findIndex((item) => item.id === favorite.id) === -1;
      });
      state.push(...favoritesToSave);
    },
    updateFavorite(state, { payload }: PayloadAction<Favorite>) {
      const { id } = payload;
      const favoriteIndex = state.findIndex((favorite) => favorite.id === id);
      if (favoriteIndex !== -1) {
        state.splice(favoriteIndex, 1, payload);
      }
    },
  },
});

export const { addFavorite, updateFavorite } = favorites.actions;

export default favorites.reducer;
