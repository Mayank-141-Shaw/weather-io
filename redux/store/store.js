import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../state-slices/locationSlice";
import forecastReducer from "../state-slices/forecastSlice";
import aqiReducer from "../state-slices/aqiSlice";

const finalStore = configureStore({
  reducer: {
    location: locationReducer,
    forecast: forecastReducer,
    aqi: aqiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default finalStore;
