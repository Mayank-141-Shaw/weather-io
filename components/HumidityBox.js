import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TiWaves } from "react-icons/ti";

import cnt from "../assets/constants.json";

const HumidityBox = ({ humidity, dewPoint }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <TiWaves />
        &nbsp; HUMIDITY
      </Text>
      <p style={styles.humidity}>{humidity ? humidity : 90}%</p>
      <br />
      <br />
      <p style={{ ...styles.bottomInfo, fontSize: "0.65rem", marginTop: "0" }}>
        The dew point is {dewPoint} right now.
      </p>
    </View>
  );
};

export default HumidityBox;

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
  humidity: {
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
  bottomInfo: {
    fontSize: "1.7rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    marginTop: "8px",
  },
});
