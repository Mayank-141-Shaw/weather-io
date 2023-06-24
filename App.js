import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import bgImg from "./assets/mnt-bg.png";
import bgHouse from "./assets/house-bg.png";
import CurrentWeatherStatus from "./components/CurrentWeatherStatus";
import BottomNavbar from "./components/BottomNavbar";
import BottomInfoScrollerSheet from "./components/BottomInfoScrollerSheet";
const weather = {
  city: "Montreal",
  temperature: 19,
  sky_status: "Mostly Clear",
  high_temp: 24,
  low_temp: 18,
};

export default function App() {
  const [btmSheetToggle, isBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    isBottomSheetVisible(!btmSheetToggle);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgimg} source={bgImg} resizeMode="cover">
        <CurrentWeatherStatus weather={weather} />
        <Image source={bgHouse} style={styles.houseImg} />
        {/* {btmSheetToggle ? <BottomInfoScrollerSheet /> : <></>} */}
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
