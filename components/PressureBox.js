import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImMeter } from "react-icons/im";

import cnt from "../assets/constants.json";
import pressureRingImg from "../assets/pressure_ring_meter.png";

/* max visibility is 16 km,  */

const PressureBox = ({ pressure }) => {
  /* pressure is around 800 - 1200 hPa , thus range is 400*/

  let deg = (Math.abs(Number(pressure) - 800) / 400) * 360;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <ImMeter />
        &nbsp; PRESSURE
      </Text>
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
        }}
      >
        <img
          src={pressureRingImg}
          width={"100%"}
          style={{ transform: `rotateZ( ${deg}deg )` }}
          alt="pressure-meter"
        />
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
          <p style={styles.pressure}>{pressure ? pressure : 1000} </p>
          <p style={styles.metric}>hPa</p>
        </div>
      </div>
    </View>
  );
};

export default PressureBox;

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
  pressure: {
    fontSize: "1.7rem",
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
