// redux/savedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: [], // array of saved articles/services
  },
  reducers: {
    addToSaved: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromSaved: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToSaved, removeFromSaved } = savedSlice.actions;
export default savedSlice.reducer;
