import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MdSunny } from "react-icons/md";

import cnt from "../assets/constants.json";
import "../style/style.css";
import { useSelector } from "react-redux";

const UvIndexBox = () => {
  const forecastData = useSelector((state) => state.forecast.value);

  const uvStatus = (pt) => {
    if (pt >= 8) return "High";
    else if (4 <= pt && pt < 8) return "Moderate";
    else return "Low";
  };

  let uvMaxPoint = forecastData.daily.uv_index_max[0];
  let status = uvStatus(uvMaxPoint);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <MdSunny />
        &nbsp; UV INDEX
      </Text>
      <p style={styles.point}>{uvMaxPoint ? uvMaxPoint : "4"}</p>
      <p style={styles.status}>{status ? status : "Moderate"}</p>
      <input
        type={"range"}
        min={0}
        max={11}
        value={uvMaxPoint ? uvMaxPoint : "4"}
        draggable="false"
        disabled
        className="show-meter"
        style={{ marginTop: "16px" }}
      />
    </View>
  );
};

export default UvIndexBox;

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
  point: {
    fontSize: "2.2rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    marginTop: "8px",
  },
  status: {
    color: "white",
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    margin: "0",
  },
});
