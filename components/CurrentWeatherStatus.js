import { StyleSheet, Text, View } from "react-native";
import React from "react";
import constant from "../assets/constants.json";

export default function CurrentWeatherStatus({ weather }) {
  return (
    <View style={styles.infobox}>
      <Text style={styles.city}>{weather.city}</Text>
      <Text adjustsFontSizeToFit style={styles.temperature}>
        {weather.temperature}
        <span style={styles.degree}></span>
      </Text>
      <Text style={styles.sky_status}>{weather.sky_status}</Text>
      <div style={styles.temp_box}>
        <Text style={styles.edge_temp}>
          H:{weather.high_temp}
          <div style={styles.degree_small}></div>
        </Text>
        <Text style={styles.edge_temp}>
          L:{weather.low_temp}
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
