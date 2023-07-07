import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generationtime_ms: 0,
  hourly: {
    time: [],
    us_aqi: [],
  },
  hourly_units: {
    time: "",
    us_aqi: "",
  },
  latitude: 0,
  longitude: 0,
  timezone: "",
  timezone_abbreviation: "",
  utc_offset_seconds: 0,
};

export const aqiSlice = createSlice({
  name: "aqi",
  initialState: { value: initialState },
  reducers: {
    setAqi: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAqi } = aqiSlice.actions;

export default aqiSlice.reducer;
