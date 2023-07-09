import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import constant from "../assets/constants.json";
import { useSelector } from "react-redux";

export default function CurrentWeatherStatus({ weather }) {
  const currentLocation = useSelector((state) => state.location.value);
  const currentForecast = useSelector((state) => state.forecast.value);

  const setCloudCover = (cover_pct) => {
    if (cover_pct >= 90) return "Very Cloudy";
    else if (70 <= cover_pct && cover_pct < 90) return "Mostly Cloudy";
    else if (50 <= cover_pct && cover_pct < 70) return "Cloudy";
    else if (30 <= cover_pct && cover_pct < 50) return "Mostly Clear";
    else return "Clear";
  };

  let currentHour = new Date().getHours();
  let currentTemperature =
    currentForecast.hourly.temperature_2m[Number(currentHour)];

  let currentCloudCover = setCloudCover(
    currentForecast.hourly.cloudcover[Number(currentHour)]
  );

  let maxTemp = currentForecast.daily.temperature_2m_max[0];
  let minTemp = currentForecast.daily.temperature_2m_min[0];

  return (
    <View style={styles.infobox}>
      <Text style={styles.city}>{currentLocation.name}</Text>
      <Text adjustsFontSizeToFit style={styles.temperature}>
        {currentTemperature}
        <span style={styles.degree}></span>
      </Text>
      <Text style={styles.sky_status}>{currentCloudCover}</Text>
      <div style={styles.temp_box}>
        <Text style={styles.edge_temp}>
          H:{maxTemp}
          <div style={styles.degree_small}></div>
        </Text>
        <Text style={styles.edge_temp}>
          L:{minTemp}
          <div style={styles.degree_small}></div>
        </Text>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  infobox: {
    width: "fit-content",
    textAlign: "center",
    padding: "2rem",
    height: "fit-content",
  },
  city: {
    fontWeight: 400,
    fontSize: "5vmax",
    lineHeight: "5vmax",
    color: constant.color.dark.primary,
    padding: "0",
  },
  temperature: {
    fontSize: "15vmax",
    color: constant.color.dark.primary,
    lineHeight: "15vmax",
    fontWeight: 200,
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
  },
  degree: {
    width: "2.5vmax",
    height: "2.5vmax",
    border: `2px solid ${constant.color.dark.primary}`,
    aspectRatio: "1/1",
    borderRadius: "50%",
    marginTop: "2.5vmax",
  },
  degree_small: {
    display: "inline-block",
    width: "0.5vmax",
    height: "0.5vmax",
    border: `1px solid ${constant.color.dark.primary}`,
    aspectRatio: "1/1",
    borderRadius: "50%",
    marginTop: "0.5vmax",
  },
  sky_status: {
    fontWeight: 400,
    fontSize: "3vmax",
    lineHeight: "3vmax",
    color: constant.color.dark.secondary,
    padding: "0",
  },
  temp_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  edge_temp: {
    color: constant.color.dark.primary,
    fontWeight: 600,
    fontSize: "2.5vmax",
    lineHeight: "2.5vmax",
    paddingTop: "5px",
    paddingLeft: "8px",
    paddingRight: "8px",
    display: "flex",
  },
});
