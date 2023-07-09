import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import bgImg from "../assets/mnt-bg.png";
import bgHouse from "../assets/house-bg.png";
import CurrentWeatherStatus from "../components/CurrentWeatherStatus";
import BottomNavbar from "../components/BottomNavbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLocation } from "../redux/state-slices/locationSlice";
import { setForecast } from "../redux/state-slices/forecastSlice";
import { setAqi } from "../redux/state-slices/aqiSlice";

export default function Homepage() {
  const dispatch = useDispatch();

  const [btmSheetToggle, isBottomSheetVisible] = useState(false);

  const getCompleteWeatherInfo = async () => {
    // first get live location via device gps
    // let deviceCoords = await getCurrentDeviceLocationViaGPS();
    // console.log(deviceCoords.coords.latitude);

    await navigator.geolocation.getCurrentPosition(
      async (res) => {
        dispatch(
          setLocation({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          })
        );

        // call forecast and aqi
        const [resForecast, resAQI] = await Promise.all([
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${res.coords.latitude}&longitude=${res.coords.longitude}&hourly=temperature_2m,dewpoint_2m,apparent_temperature,pressure_msl,cloudcover,windspeed_10m,winddirection_10m,visibility,precipitation,rain,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,uv_index_max,rain_sum,sunset&timezone=auto`
          ),
          axios.get(
            `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${res.coords.latitude}&longitude=${res.coords.longitude}&timezone=auto&hourly=us_aqi`
          ),
        ]).catch((err) => console.log(err));

        dispatch(setForecast(resForecast.data));
        dispatch(setAqi(resAQI.data));

        console.log(resAQI.data, resForecast.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const toggleBottomSheet = () => {
    isBottomSheetVisible(!btmSheetToggle);
  };

  useEffect(() => {
    getCompleteWeatherInfo();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgimg} source={bgImg} resizeMode="cover">
        <CurrentWeatherStatus />
        <Image source={bgHouse} style={styles.houseImg} />
        <BottomNavbar
          style={{ width: "100%" }}
          toggleBottomSheet={toggleBottomSheet}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "98vh",
    // overflowY: "hidden",
  },
  bgimg: {
    justifyContent: "center",
    alignItems: "center",
    height: "inherit",
  },
  houseImg: {
    width: "-webkit-fill-available",
    aspectRatio: "10/11",
    padding: "0",
    margin: "0",
    transform: "translateY(50px)",
  },
});
