import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RiWindyFill } from "react-icons/ri";

import cnt from "../assets/constants.json";

import windRingImg from "../assets/wind-direction-meter.png";
import meterPin from "../assets/wind-meter-pin.png";
import { useSelector } from "react-redux";

/* max visibility is 16 km,  */

const WindBox = () => {
  const forecastData = useSelector((state) => state.forecast.value);

  let currentHour = new Date().getHours();
  let speed = forecastData.hourly.windspeed_10m[Number(currentHour)];
  let directionInDegree =
    forecastData.hourly.winddirection_10m[Number(currentHour)];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <RiWindyFill />
        &nbsp; WIND
      </Text>
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
        }}
      >
        <img src={windRingImg} width={"100%"} alt="wind-meter" />
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "0",
            width: "100%",
            aspectRatio: "1/1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={styles.speed}>{speed ? speed : 1000} </p>
          <p style={styles.metric}>km/h</p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(1rem + 5%)",
          left: "5%",
          width: "90%",
          aspectRatio: "1/1",
        }}
      >
        <img
          src={meterPin}
          alt="pin"
          width={"100%"}
          height={"100%"}
          style={{
            filter: "drop-shadow(0 0 5px skyblue",
            transform: `rotateZ(${directionInDegree}deg)`,
          }}
        />
      </div>
    </View>
  );
};

export default WindBox;

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${cnt.color.dark.secondary}`,
    padding: "1rem",
    paddingBottom: "0",
    borderRadius: "22px",
    backgroundColor: "rgba(72, 49, 157, 0.2)",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    flexGrow: "1",
    width: "48%",
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: cnt.color.dark.secondary,
    textTransform: "uppercase",
    fontSize: "0.8rem",
  },
  speed: {
    fontSize: "1.25rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  metric: {
    fontSize: "0.8rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
