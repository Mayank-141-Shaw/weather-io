import { StyleSheet, Text, View } from "react-native";
import React from "react";

import cnt from "../assets/constants.json";

import img1 from "../assets/sm-day-showers.png";
import img2 from "../assets/sm-night-mild-rain.png";
import img3 from "../assets/sm-night-partly-cloudy.png";
import img4 from "../assets/sm-day-mild-rain.png";
import img5 from "../assets/tornado.png";

const imgPaths = [img1, img2, img3, img4, img5];

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SkyStatusBlock = ({ temp, date, time, cloudcover, humidity }) => {
  
  // we dealing with daily or weekly
  let dailyOrWeekly = (date === null) ? true : false;


  // get time info
  const getTimeInfo = (_time, _cloudcover, _humidity) => {
    let hours = new Date(_time).getHours();

    const timeAMorPM = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours == 0 ? 12 : hours;

    // choose img from cloudcover, humidity and timeamorpm
    let cloudInd = 0;

    if (_cloudcover >= 90 && _humidity >= 90) cloudInd = 4; // storm
    else if (timeAMorPM === "AM") {
      if (_cloudcover >= 60 && _humidity >= 50) cloudInd = 0; // showers in day
      else cloudInd = 3; // mild rain chance in day
    } else {
      if (_cloudcover >= 60 && _humidity >= 50) cloudInd = 1; // mild rain at night
      else cloudInd = 2; // partly cloudy at night
    }

    return {hours, timeAMorPM, cloudInd}
  }

  // get weekly day info
  const getDateInfo = (_date, _cloudcover, _humidity) => {
    let dd = new Date(_date)
    let day = dd.getDate();
    let month = dd.getMonth()

    // choose img from cloudcover, humidity and timeamorpm
    let cloudInd = 0;

    if (_cloudcover >= 90 && _humidity >= 90) cloudInd = 4; // storm
    else if (_cloudcover >= 60 && _humidity >= 50) cloudInd = 0; // showers in day
    else cloudInd = 3;


    return {day, month, cloudInd}
  }

  // const [hours, timeAMorPM, cloudInd] = getTimeInfo(time, cloudcover, humidity)
  // const [day, month, cloudInd] = getDateInfo(date, cloudcover, humidity)

  const data = dailyOrWeekly ? getTimeInfo(time, cloudcover, humidity) : getDateInfo(date, cloudcover, humidity)

  return (
    <View style={styles.container}>
      {
        dailyOrWeekly ? 
          <Text style={styles.time}>{`${data.hours} ${data.timeAMorPM}`}</Text>
          :
          <Text style={styles.time}>{`${month[Number(data.month)]}, ${data.day}`}</Text>
      }
      <img src={imgPaths[data.cloudInd]} style={styles.img} />
      <Text style={styles.humidity}>{`${humidity}%`}</Text>
      <Text style={styles.temperature}>
        {temp}
        <div style={styles.small_temp}></div>
      </Text>
    </View>
  );
};

export default SkyStatusBlock;

const styles = StyleSheet.create({
  container: {
    borderRadius: "30px",
    margin: "6px",
    width: "60px",
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "8px",
    paddingRight: "8px",
    backgroundColor: "rgba(72, 49, 157, 0.2)",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow:
      "5px 4px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)",
  },
  time: {
    color: "white",
  },
  img: {
    width: "100%",
  },
  humidity: {
    color: "rgb(0,184,255)",
    transform: "translateY(-8px)",
    paddingTop: "8px",
  },
  temperature: {
    color: "white",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  small_temp: {
    display: "inline-block",
    width: "1vmax",
    height: "1vmax",
    border: `1px solid white`,
    aspectRatio: "1/1",
    borderRadius: "50%",
    marginTop: "0.5vmax",
  },
});
