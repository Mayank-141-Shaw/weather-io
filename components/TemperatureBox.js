import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BsThermometerHalf } from "react-icons/bs";

import cnt from "../assets/constants.json";

const TemperatureBox = ({ feelLikeTemp, actualTemp }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <BsThermometerHalf />
        &nbsp; FEELS LIKE
      </Text>
      <p style={styles.feelTemp}>
        {feelLikeTemp ? feelLikeTemp : 19}
        <div style={styles.small_temp_degree}></div>
      </p>
      <br />
      <br />
      <p style={{ ...styles.bottomInfo, fontSize: "0.65rem", marginTop: "0" }}>
        {Math.abs(feelLikeTemp - actualTemp) > 5
          ? "Much different from actual temperature"
          : "Similar to the actual temperature"}
      </p>
    </View>
  );
};

export default TemperatureBox;

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${cnt.color.dark.secondary}`,
    padding: "1rem",
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
  feelTemp: {
    fontSize: "1.7rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    marginTop: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  small_temp_degree: {
    display: "inline-block",
    width: "0.75vmax",
    height: "0.75vmax",
    border: `2px solid white`,
    aspectRatio: "1/1",
    borderRadius: "50%",
    marginTop: "0.75vmax",
  },
  bottomInfo: {
    fontSize: "1.7rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    marginTop: "8px",
  },
});
