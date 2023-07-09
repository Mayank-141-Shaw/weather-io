import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BsSunriseFill } from "react-icons/bs";

import daylightCurve from "../assets/SVG/daylight-curve.svg";

import cnt from "../assets/constants.json";
import { useSelector } from "react-redux";

const SunriseTimeBox = () => {
  /* sunrise is usually from 4:30am to 8:00am ==> i.e 3.5 hours or 3.5*60 mins of range = 210 mins*/
  /* so based on the sunrise time we get the X position and based on Y = sin(x) we calculate Y pos */
  /* X is sunrise time in minutes, which will give us the left position in % , and x radian will range from
    0 to 180deg, thus the range is pie
  */

  /* y ranges from -50% top to -115% top for the dot, so for x=0deg y should br -82.5%, height of each 
    half is 32.5%*/

  const forecastData = useSelector((state) => state.forecast.value);

  let sunriseTime = forecastData.daily.sunrise[0];
  let sunsetTime = forecastData.daily.sunset[0];

  const getMinutes = (min) => {
    let hh = Number(min.split(":")[0]);
    let mm = Number(min.split(":")[1]);

    return hh * 60 + mm;
  };

  // get time from sunrise time
  // const time = sunriseTime.split(" ")[0];
  let time = `${new Date(sunriseTime).toLocaleTimeString()}`;
  // remove seconds
  time =
    time.substring(time.length - 6, 0) +
    time.substring(time.length, time.length - 3);
  sunriseTime = time;
  sunsetTime = new Date(sunsetTime).toLocaleTimeString();
  sunsetTime =
    sunsetTime.substring(sunsetTime.length - 6, 0) +
    sunsetTime.substring(sunsetTime.length, sunsetTime.length - 3);
  let mins =
    getMinutes(time.substring(time.length - 3, 0)) - getMinutes("4:30");

  // calculate x percentage
  let xPosOfTimeDot = Math.floor((mins / 210) * 100);

  // convert x to radian in pie
  // xRad = -pie/2 + xPosOfTimeDot * 2*pie
  let xRad = -(Math.PI / 2) + (xPosOfTimeDot / 100) * 2 * Math.PI;
  let yHeight = Math.sin(xRad);

  // width of each half
  let yPosOfTimeDot = -82.5 - yHeight * 32.5;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <BsSunriseFill />
        &nbsp; SUNRISE
      </Text>
      <p style={styles.sunriseTime}>{sunriseTime ? sunriseTime : "5:28 AM"}</p>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          paddingTop: "0.5rem",
        }}
      >
        <object
          data={daylightCurve}
          width={"100%"}
          height={"100%"}
          style={{ filter: "saturate(3)" }}
        ></object>
        <div
          style={{
            position: "relative",
            top: yPosOfTimeDot + "%",
            left: xPosOfTimeDot + "%",
            transform: "translateX(-5px) translateY(8px)",
            zIndex: "500",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 0 10px 1px white",
            }}
          ></div>
        </div>
      </div>
      <p style={{ fontSize: "0.75rem", color: "white", margin: "0" }}>
        Sunset : {sunsetTime ? sunsetTime : "6:30 PM"}
      </p>
    </View>
  );
};

export default SunriseTimeBox;

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
  sunriseTime: {
    fontSize: "1.7rem",
    fontWeight: "300",
    color: "white",
    padding: "0",
    margin: "0",
    marginTop: "8px",
  },
});
