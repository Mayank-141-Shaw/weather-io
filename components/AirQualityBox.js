import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BiEqualizer } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import cnt from "../assets/constants.json";
import "../style/style.css";

const AirQualityBox = ({ qualityStatus, qualityPoints }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <BiEqualizer />
        &nbsp; Air Quality
      </Text>
      <Text style={styles.status}>
        {qualityStatus ? qualityStatus : "3-Low Health Risk"}
      </Text>
      <input
        type={"range"}
        min={0}
        max={500}
        value={qualityPoints}
        draggable="false"
        disabled
        className="show-meter"
      />
      <a className="link-box" href="https://www.airnow.gov/aqi/aqi-basics/">
        <Text style={styles.linktext}>See More</Text>
        <MdOutlineArrowForwardIos />
      </a>
    </View>
  );
};

export default AirQualityBox;

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${cnt.color.dark.secondary}`,
    padding: "1rem",
    borderRadius: "22px",
    backgroundColor: "rgba(72, 49, 157, 0.2)",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    flexGrow: "1",
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
  status: {
    color: "white",
    fontSize: "1.2rem",
    lineHeight: "2.5rem",
  },
  linktext: {
    color: "white",
    fontSize: "1rem",
  },
});
