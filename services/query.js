import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/state-slices/locationSlice";

export const getAqiData = async (lat, long) => {
  await axios
    .get(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&timezone=auto&hourly=us_aqi`,
      {
        responseType: "json",
      }
    )
    .then(
      (res) => {
        let aqi_data = res.data;
        localStorage.setItem("_weather_app_aqi", JSON.stringify(aqi_data));
      },
      (err) => {
        console.log(err);
      }
    );
};

export const getForecastData = async (lat, long) => {
  await axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,dewpoint_2m,apparent_temperature,pressure_msl,cloudcover,windspeed_10m,winddirection_10m,visibility,precipitation,rain,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,uv_index_max,rain_sum,sunset&timezone=auto`,
      {
        responseType: "json",
      }
    )
    .then(
      (res) => {
        let forecast_data = res.data;
        localStorage.setItem(
          "_weather_app_forecast",
          JSON.stringify(forecast_data)
        );
      },
      (err) => {
        console.log(err);
      }
    );
};

export const getPlacesListByGeocoding = async (place) => {
  await axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=10&language=en&format=json`,
      { responseType: "json" }
    )
    .then(
      (res) => {
        // list is inside results index
        let places_list = res.data;
        localStorage.setItem(
          "_weather_app_geocode_locations_list",
          JSON.stringify(places_list)
        );
      },
      (err) => {
        console.log(err);
      }
    );
};

export const getCurrentDeviceLocationViaGPS = async () => {
  const dispatch = useDispatch();

  await navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res);
      dispatch(setLocation(res));
    },
    (err) => console.log(err)
  );
};
