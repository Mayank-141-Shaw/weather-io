import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import "../style/BottomNavbar.css";
import cnt from "../assets/constants.json";

import { MdOutlineLocationSearching } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { CgMenuGridO } from "react-icons/cg";
import BottomInfoScrollerSheet from "./BottomInfoScrollerSheet";
import SkyStatusBlock from "./SkyStatusBlock";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import AirQualityBox from "./AirQualityBox";
import UvIndexBox from "./UvIndexBox";
import SunriseTimeBox from "./SunriseTimeBox";
import RainFallBox from "./RainFallBox";
import TemperatureBox from "./TemperatureBox";
import HumidityBox from "./HumidityBox";
import VisibilityBox from "./VisibilityBox";
import PressureBox from "./PressureBox";
import WindBox from "./WindBox";
import GetLiveGPSLocationBox from "./GetLiveGPSLocationBox";
import ManualLocationBox from "./ManualLocationBox";
import { useSelector } from "react-redux";

export default function BottomNavbar() {
  const forecastData = useSelector((state) => state.forecast.value);

  const [midBtn, toggleMidBtn] = useState(false);
  const [trackBtn, toggleTrackBtn] = useState(false);
  const [menuBtn, toggleMenuBtn] = useState(false);

  const [toggleHourlyOrWeekly, setHourlyOrWeekly] = useState(true);

  const trackLocation = () => {
    toggleMidBtn(false);
    toggleMenuBtn(false);
    toggleTrackBtn(!trackBtn);
    console.log("trackLocation");
  };

  const menu = () => {
    toggleMidBtn(false);
    toggleMenuBtn(!menuBtn);
    toggleTrackBtn(false);
    console.log("menu");
  };

  const openinfo = () => {
    console.log("open mid info box");
    toggleMidBtn(!midBtn);
    toggleMenuBtn(false);
    toggleTrackBtn(false);

    //toggleBottomSheet();
  };

  const findDailyAvg = (arr = []) => {
    let temp = [];
    let sum = 0;
    let ind = 0;
    for (let i = 0; i < arr.length; i++) {
      if (ind % 24 == 23) {
        sum += arr[ind];
        temp.push(Math.round(sum / 24));
        ind++;
        sum = 0;
      } else {
        sum += arr[ind];
        ind++;
      }
    }
    return temp;
  };

  let avgDailyCloudcover = findDailyAvg(forecastData.hourly.cloudcover);
  let avgDailyHumidity = findDailyAvg(
    forecastData.hourly.precipitation_probability
  );

  // getting hourly data for status flatlist
  let weatherStatusBlockData = [];
  let weeklyWeatherStatusBlockData = [];
  let currentHour = new Date().getHours();

  for (let i = currentHour; i < currentHour + 12; i++) {
    weatherStatusBlockData.push({
      date: null,
      time: forecastData.hourly.time[i],
      temp: forecastData.hourly.temperature_2m[i],
      humidity: forecastData.hourly.precipitation_probability[i],
      sky: forecastData.hourly.cloudcover[i],
    });
  }

  // weekly data
  for (let i = 0; i < 7; i++) {
    weeklyWeatherStatusBlockData.push({
      time: null,
      date: forecastData.daily.time[i],
      temp: forecastData.daily.temperature_2m_max[i],
      sky: avgDailyCloudcover[i],
      humidity: avgDailyHumidity[i],
    });
  }

  return (
    <div style={styles.taskbar}>
      <View
        style={{ ...styles.scrollTab, display: trackBtn ? "block" : "none" }}
      >
        <div>
          <div style={styles.SwitchRow}>
            <Button title="Track Location" color={"transparent"} />
          </div>
          <div
            className="scroll-box"
            style={styles.weather_info_scrollable_box}
          >
            {/* get gps location and enter city name */}
            <GetLiveGPSLocationBox />
            <ManualLocationBox />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </View>
      <View style={{ ...styles.scrollTab, display: midBtn ? "block" : "none" }}>
        <div>
          <div style={styles.SwitchRow}>
            <Button
              color={"transparent"}
              onPress={() => setHourlyOrWeekly(true)}
              title="Hourly Forecast"
            />
            <Button
              color={"transparent"}
              onPress={() => setHourlyOrWeekly(false)}
              title="Weekly Forecast"
            />
          </div>
          <div
            className="scroll-box"
            style={styles.weather_info_scrollable_box}
          >
            {toggleHourlyOrWeekly ? (
              <FlatList
                style={styles.forecastArray}
                data={weatherStatusBlockData}
                horizontal
                renderItem={({ item, index }) => (
                  <TouchableHighlight
                    key={index}
                    onPress={() => console.log("comp pressed")}
                  >
                    <SkyStatusBlock
                      date={item.date}
                      temp={item.temp}
                      time={item.time}
                      sky={item.sky}
                      humidity={item.humidity}
                    />
                  </TouchableHighlight>
                )}
              ></FlatList>
            ) : (
              <FlatList
                style={styles.forecastArray}
                data={weeklyWeatherStatusBlockData}
                horizontal
                renderItem={({ item, index }) => (
                  <TouchableHighlight
                    key={index}
                    onPress={() => console.log("comp pressed")}
                  >
                    <SkyStatusBlock
                      temp={item.temp}
                      date={item.date}
                      time={item.time}
                      sky={item.sky}
                      humidity={item.humidity}
                    />
                  </TouchableHighlight>
                )}
              ></FlatList>
            )}

            <AirQualityBox />

            {/* uv index box and sunrise box */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: "4%",
                flexWrap: "wrap",
              }}
            >
              <UvIndexBox />
              <SunriseTimeBox />
              <WindBox />
              <RainFallBox />
              <TemperatureBox />
              <HumidityBox />
              <VisibilityBox />
              <PressureBox />

              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </View>
      <View
        style={{ ...styles.scrollTab, display: menuBtn ? "block" : "none" }}
      >
        <div>
          <div style={styles.SwitchRow}>
            <Button color={"transparent"} title="Menu Forecast" />
            <Button color={"transparent"} title="Weekly Forecast" />
          </div>
          <div
            className="scroll-box"
            style={styles.weather_info_scrollable_box}
          >
            <FlatList
              style={styles.forecastArray}
              data={weatherStatusBlockData}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  key={index}
                  onPress={() => console.log("comp pressed")}
                >
                  <SkyStatusBlock
                    temp={item.temp}
                    time={item.time}
                    sky={item.sky}
                    humidity={item.humidity}
                  />
                </TouchableHighlight>
              )}
            ></FlatList>

            <AirQualityBox
              qualityStatus={"2-High Health Risk"}
              qualityPoints={137}
            />

            {/* uv index box and sunrise box */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: "4%",
                flexWrap: "wrap",
              }}
            >
              <UvIndexBox uvPoint={"4"} uvStatus={"Moderate"} />
              <SunriseTimeBox sunriseTime={"5:23 AM"} />
              <WindBox speed={"200"} directionInDegree={"69"} />
              <RainFallBox rainfallPrevHr={"1.8"} rainfallFullDay={"1.2"} />
              <TemperatureBox feelLikeTemp={"19"} actualTemp={"19"} />
              <HumidityBox humidity={"90"} dewPoint={"17"} />
              <VisibilityBox visibility={"8"} />
              <PressureBox pressure={"950"} />

              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </View>
      <div style={styles.bar}>
        <MdOutlineLocationSearching
          onClick={trackLocation}
          size={25}
          color="#fff"
        />
        <div style={styles.btn_box}>
          <div style={styles.btn_box_outer}>
            <div style={styles.btn_box_inner}>
              <button onClick={openinfo} style={styles.add_btn}>
                <GoPlus size={"2rem"} color="#48319D"></GoPlus>
              </button>
            </div>
          </div>
        </div>
        <CgMenuGridO onClick={menu} size={25} color="#fff" />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  taskbar: {
    zIndex: "50",
    position: "fixed",
    bottom: "0",
    padding: 0,
    margin: 0,
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Verdana",
  },
  SwitchRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    boxShadow: "0px 1px 1px rgba(117, 130, 244, 0.5)",
  },
  weather_info_scrollable_box: {
    padding: "1rem",
    flex: 1,
  },
  glowEllipse: {
    position: "absolute",
    top: "-16px",
    left: "45vw",
    height: "32px",
    width: "10vw",
    borderRadius: "50%",
    backgroundColor: "transparent",
    backdropFilter: "blur(25px)",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.306)",
  },
  forecastArray: {},
  scrollTab: {
    width: "inherit",
    height: "85vh",
    paddingTop: "1rem",
    transform: "translateY(50px)",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    backdropFilter: "blur(25px)",
    border: "0.5px solid rgba(117, 130, 244, 0.5)",
    backgroundImage: `linear-gradient(90deg,  rgba(37, 36, 76, 0.7) 0%, rgba(58, 58, 106, 0.7) 50%, rgba(37, 36, 76, 0.7) 100%)`,
  },
  bar: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    paddingTop: "13px",
    paddingBottom: "13px",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    backdropFilter: "blur(25px)",
    border: "0.5px solid rgba(117, 130, 244, 0.5)",
    backgroundImage: `linear-gradient(180deg, rgba(58, 58, 106, 0.26) 0%, rgba(37, 36, 76, 0.26) 100%)`,
  },
  btn_box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundImage: "linear-gradient(0deg, #262C51 0%, #3E3F74 100%)",
  },
  btn_box_outer: {
    borderRadius: "50%",
    backgroundImage:
      "linear-gradient(139.71deg, rgba(0, 0, 0, 0.4) 19.24%, rgba(255, 255, 255, 0.304) 86.09%)",
    backdropFilter: "blur(0.5px)",
    padding: "4px",
  },
  btn_box_inner: {
    borderRadius: "50%",
    backgroundImage:
      "linear-gradient(144.91deg, #F5F5F9 18.06%, #DADFE7 85.87%)",
    boxShadow:
      "-10px -10px 20px rgba(255, 255, 255, 0.5), 10px 10px 20px rgba(13, 20, 49, 0.5), inset 1px 1px 0.5px #FFFFFF",
  },
  add_btn: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    backgroundImage:
      "background: linear-gradient(153.14deg, rgba(255, 255, 255, 0) 14.45%, #BBBFC7 83.19%)",
    backdropFilter: "blur(1px)",
  },
  btn_mask: {
    position: "absolute",
    top: 0,
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    backdropFilter: "blur(1px)",
    backgroundImage:
      "linear-gradient(144.91deg, #F5F5F9 18.06%, #DADFE7 85.87%)",
  },
});
