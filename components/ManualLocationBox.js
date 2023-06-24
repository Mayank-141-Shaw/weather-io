import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import cnt from "../assets/constants.json";

const ManualLocationBox = () => {
  const [cityName, setCityName] = useState("");

  return (
    <div style={styles.container}>
      <Text style={styles.heading}>
        <BiCurrentLocation />
        &nbsp; Type your location
      </Text>
      <TextInput
        onChangeText={setCityName}
        value={cityName}
        style={styles.city_input_box}
        placeholder={"Enter your city name"}
        placeholderTextColor={cnt.color.dark.primary}
      />
    </div>
  );
};

export default ManualLocationBox;

const styles = StyleSheet.create({
  container: {
    border: `1px solid ${cnt.color.dark.secondary}`,
    padding: "1rem",
    borderRadius: "10px",
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
    fontWeight: "bold",
  },
  city_input_box: {},
});
