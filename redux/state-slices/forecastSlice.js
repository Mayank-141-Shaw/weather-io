import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  daily: {
    rain_sum: [],
    sunrise: [],
    sunset: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    time: [],
    uv_index_max: [],
  },
  daily_units: {
    rain_sum: "",
    sunrise: "",
    sunset: "",
    temperature_2m_max: "",
    temperature_2m_min: "",
    time: "",
    uv_index_max: "",
  },
  elevation: 0,
  generationtime_ms: 0,
  hourly: {
    apparent_temperature: [],
    cloudcover: [],
    dewpoint_2m: [],
    precipitation: [],
    precipitation_probability: [],
    pressure_msl: [],
    rain: [],
    temperature_2m: [],
    time: [],
    visibility: [],
    winddirection_10m: [],
    windspeed_10m: [],
  },
  hourly_units: {
    apparent_temperature: "",
    cloudcover: "",
    dewpoint_2m: "",
    precipitation: "",
    precipitation_probability: "",
    pressure_msl: "",
    rain: "",
    temperature_2m: "",
    time: "",
    visibility: "",
    winddirection_10m: "",
    windspeed_10m: "",
  },
  latitude: 0,
  longitude: 0,
  timezone: "",
  timezone_abbreviation: "",
  utc_offset_seconds: 0,
};

export const forecastSlice = createSlice({
  name: "forecast",
  initialState: { value: initialState },
  reducers: {
    setForecast: (state, action) => {
      state.value = action.payload;
      console.log("set forecast " + state.value);
    },
  },
});

export const { setForecast } = forecastSlice.actions;

export default forecastSlice.reducer;
