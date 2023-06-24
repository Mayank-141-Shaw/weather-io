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

const GetLiveGPSLocationBox = () => {
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
    let deviceCoords = await getCurrentDeviceLocationViaGPS();
    console.log(deviceCoords.coords.latitude);

    // // get the location that was stored in localStorage
    // let deviceCoords = JSON.parse(
    //   localStorage.getItem("_weather_app_currentLocation")
    // );

    // get lat and long of this coords and get forecast and aqi results
    await getForecastData(
      deviceCoords.coords.latitude,
      deviceCoords.coords.longitude
    );
    await getAqiData(
      deviceCoords.coords.latitude,
      deviceCoords.coords.longitude
    );

    // now all required data is available and inside localstorage
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
