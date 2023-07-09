import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TbDropletFilled } from "react-icons/tb";

import cnt from "../assets/constants.json";
import { useSelector } from "react-redux";

const RainFallBox = () => {
  const forecastData = useSelector((state) => state.forecast.value);

  let currentHour = new Date().getHours();
  let rainfall = forecastData.hourly.rain[Number(currentHour)];
  let rainfallFullDay = forecastData.daily.rain_sum[0];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <TbDropletFilled />
        &nbsp; RAINFALL
      </Text>
      <p style={styles.rainfall}>
        {rainfall ? rainfall : 1.8} mm <br />
      </p>
      <p style={{ ...styles.rainfall, fontSize: "1.2rem", marginTop: "0" }}>
        in last hour
      </p>
      <br />
      <p style={{ ...styles.rainfall, fontSize: "0.65rem", marginTop: "0" }}>
        {rainfallFullDay ? rainfallFullDay : 1.2} mm expected in the next 24
        hours
      </p>
    </View>
  );
};

export default RainFallBox;

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
  rainfall: {
    fontSize: "1.7rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    marginTop: "8px",
  },
});
