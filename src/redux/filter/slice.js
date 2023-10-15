import { createSlice } from '@reduxjs/toolkit';
const filterState = '';
export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterState,
  reducers: {
    addFilter: (state, { type, payload }) => {
      if (state) {
        state = '';
        return state + payload;
      }
      return state + payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { addFilter } = filterSlice.actions;
