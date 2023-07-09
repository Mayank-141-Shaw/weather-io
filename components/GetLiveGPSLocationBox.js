import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import GetLocation from "react-native-get-location";
import axios from "axios";

import cnt from "../assets/constants.json";
import { BsPinMapFill } from "react-icons/bs";
import {
  getAqiData,
  getCurrentDeviceLocationViaGPS,
  getForecastData,
} from "../services/query";

import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../redux/state-slices/locationSlice";
import { setForecast } from "../redux/state-slices/forecastSlice";
import { setAqi } from "../redux/state-slices/aqiSlice";

const GetLiveGPSLocationBox = () => {
  const dispatch = useDispatch();

  const requestGpsPermission = async () => {
    await PermissionsAndroid.request(
      "android.permission.ACCESS_FINE_LOCATION",
      {
        title: "Allow location access",
        message: "This will enable the app to get your live location",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
        buttonNeutral: "Ask Me Later",
      }
    )
      .then(
        (data) => {
          if (data == PermissionsAndroid.RESULTS.GRANTED) {
            new Geolocation().getCurrentPosition(
              (res) => {
                console.log("Response of location" + res);
              },
              (err) => {
                console.log(err);
              }
            );
          }
        },
        (err) => {}
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompleteWeatherInfo = async () => {
    // first get live location via device gps
    // let deviceCoords = await getCurrentDeviceLocationViaGPS();
    // console.log(deviceCoords.coords.latitude);

    await navigator.geolocation.getCurrentPosition(
      async (res) => {
        dispatch(
          setLocation({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          })
        );

        // call forecast and aqi
        const [resForecast, resAQI] = await Promise.all([
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${res.coords.latitude}&longitude=${res.coords.longitude}&hourly=temperature_2m,dewpoint_2m,apparent_temperature,pressure_msl,cloudcover,windspeed_10m,winddirection_10m,visibility,precipitation,rain,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,uv_index_max,rain_sum,sunset&timezone=auto`
          ),
          axios.get(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${res.coords.latitude}&longitude=${res.coords.longitude}&timezone=auto&hourly=us_aqi`
          ),
        ]).catch((err) => console.log(err));

        dispatch(setForecast(resForecast.data));
        dispatch(setAqi(resAQI.data));

        console.log(resAQI.data, resForecast.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div onClick={getCompleteWeatherInfo} style={styles.container}>
      <Text style={styles.heading}>
        <BsPinMapFill />
        &nbsp; Get Your Live Location
      </Text>
    </div>
  );
};

export default GetLiveGPSLocationBox;

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${cnt.color.dark.secondary}`,
    padding: "1rem",
    borderRadius: "10px",
    backgroundColor: "rgba(72, 49, 157, 0.2)",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    flexGrow: "1",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: cnt.color.dark.secondary,
    textTransform: "uppercase",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
});
