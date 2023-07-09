import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FaEye } from "react-icons/fa";

import cnt from "../assets/constants.json";
import { useSelector } from "react-redux";

/* max visibility is 16 km,  */

const VisibilityBox = () => {
  const forecastData = useSelector((state) => state.forecast.value);

  let currentHour = new Date().getHours();
  let visibility =
    Number(forecastData.hourly.visibility[Number(currentHour)]) / 1000;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <FaEye />
        &nbsp; VISIBILITY
      </Text>
      <p style={styles.visibility}>{visibility ? visibility : 8} km</p>
      <br />
      <br />
      <p style={{ ...styles.bottomInfo, fontSize: "0.65rem", marginTop: "0" }}>
        {visibility >= 24 ? "Good visibility" : "Poor Visibility"}
      </p>
    </View>
  );
};

export default VisibilityBox;

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
  visibility: {
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
