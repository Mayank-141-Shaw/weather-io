import { StyleSheet, Text, View } from "react-native";
import React from "react";

import cnt from "../assets/constants.json";

const imgPaths = [
  "../assets/sm-day-showers.png",
  "../assets/sm-night-mild-rain.png",
  "../assets/sm-night-partly-cloudy.png",
  "../assets/sm-day-mild-rain.png",
  "../assets/tornado.png",
];

import sampleImg from "../assets/sm-night-mild-rain.png";

const SkyStatusBlock = ({ temp, time, sky, humidity }) => {
  const timeAMorPM = time >= 12 ? "PM" : "AM";
  time = time % 12;
  time = time == 0 ? 12 : time;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{`${time} ${timeAMorPM}`}</Text>
      <img src={sampleImg} style={styles.img} />
      <Text style={styles.humidity}>{`${humidity}%`}</Text>
      <Text style={styles.temperature}>
        {temp}
        <div style={styles.small_temp}></div>
      </Text>
    </View>
  );
};

export default SkyStatusBlock;

const styles = StyleSheet.create({
  container: {
    borderRadius: "30px",
    margin: "6px",
    width: "60px",
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "8px",
    paddingRight: "8px",
    backgroundColor: "rgba(72, 49, 157, 0.2)",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow:
      "5px 4px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)",
  },
  time: {
    color: "white",
  },
  img: {
    width: "100%",
  },
  humidity: {
    color: "rgb(0,184,255)",
    transform: "translateY(-8px)",
  },
  temperature: {
    color: "white",
    fontSize: "1.1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  small_temp: {
    display: "inline-block",
    width: "1vmax",
    height: "1vmax",
    border: `1px solid white`,
    aspectRatio: "1/1",
    borderRadius: "50%",
    marginTop: "0.5vmax",
  },
});
