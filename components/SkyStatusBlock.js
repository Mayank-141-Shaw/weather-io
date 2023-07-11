import { StyleSheet, Text, View } from "react-native";
import React from "react";

import cnt from "../assets/constants.json";

import img1 from "../assets/sm-day-showers.png";
import img2 from "../assets/sm-night-mild-rain.png";
import img3 from "../assets/sm-night-partly-cloudy.png";
import img4 from "../assets/sm-day-mild-rain.png";
import img5 from "../assets/tornado.png";

const imgPaths = [img1, img2, img3, img4, img5];

const SkyStatusBlock = ({ temp, time, cloudcover, humidity }) => {
  let hours = new Date(time).getHours();

  const timeAMorPM = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours == 0 ? 12 : hours;

  // choose img from cloudcover, humidity and timeamorpm
  let cloudInd = 0;

  if (cloudcover >= 90 && humidity >= 90) cloudInd = 4; // storm
  else if (timeAMorPM === "AM") {
    if (cloudcover >= 60 && humidity >= 50) cloudInd = 0; // showers in day
    else cloudInd = 3; // mild rain chance in day
  } else {
    if (cloudcover >= 60 && humidity >= 50) cloudInd = 1; // mild rain at night
    else cloudInd = 2; // partly cloudy at night
  }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{`${hours} ${timeAMorPM}`}</Text>
      <img src={imgPaths[cloudInd]} style={styles.img} />
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
    paddingTop: "8px",
  },
  temperature: {
    color: "white",
    fontSize: "1rem",
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
