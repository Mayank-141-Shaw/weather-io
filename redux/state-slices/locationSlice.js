import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: 0,
  longitude: 0,
};

export const locationSlice = createSlice({
  name: "loaction",
  initialState: { value: initialState },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
