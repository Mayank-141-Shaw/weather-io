import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: 0,
  longitude: 0,
  name: "Montreal",
};

export const locationSlice = createSlice({
  name: "loaction",
  initialState: { value: initialState },
  reducers: {
    setLocation: (state, action) => {
      state.value.latitude = action.payload.latitude;
      state.value.longitude = action.payload.longitude;
      state.value.name = action.payload.name
        ? action.payload.name
        : state.value.name;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
