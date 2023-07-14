import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import cnt from "../assets/constants.json";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/state-slices/locationSlice";
import { setForecast } from "../redux/state-slices/forecastSlice";
import { setAqi } from "../redux/state-slices/aqiSlice";

const CityTile = (props) => {
  const handleClick = () => {
    props.onClickCallback(props.data._id);
  };

  return (
    <div
      onClick={handleClick}
      key={props.data._id}
      style={styles.city_tile.tile}
    >
      <Text style={styles.city_tile.line}>
        {props.data.name}
        {props.data.admin2 != undefined ? ", " + props.data.admin2 : ""}
      </Text>
      <Text style={styles.city_tile.line}>
        {props.data.admin1 != undefined ? props.data.admin1 + ", " : ""}
        {props.data.country}
      </Text>
      <Text style={styles.city_tile.coords}>
        Lat: {props.data.latitude}, Long: {props.data.longitude}
      </Text>
    </div>
  );
};

const ManualLocationBox = () => {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(-1);

  const dispatch = useDispatch();

  const updateForecastDataFromNewCoords = async (lat, long, name) => {
    // we have coords data from cities[id], use them to make a new promise call and update the data

    // update current location
    dispatch(
      setLocation({
        latitude: lat,
        longitude: long,
        name: name,
      })
    );

    // call forecast, aqi
    const [resForecast, resAQI] = await Promise.all([
      axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,dewpoint_2m,apparent_temperature,pressure_msl,cloudcover,windspeed_10m,winddirection_10m,visibility,precipitation,rain,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,uv_index_max,rain_sum,sunset&timezone=auto`
      ),
      axios.get(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&timezone=auto&hourly=us_aqi`
      ),
    ]).catch((err) => console.log(err));

    dispatch(setForecast(resForecast.data));
    dispatch(setAqi(resAQI.data));
  };

  const getSelectedLocationId = async (id) => {
    setSelectedCity(id);
    await updateForecastDataFromNewCoords(
      cities[id].latitude,
      cities[id].longitude,
      cities[id].name + ", " + cities[id].country
    );

    // empty cities list
  };

  const getCititesFromCityName = async () => {
    if (cityName !== "") {
      await axios
        .get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`
        )
        .then(
          (res) => {
            // res.data.results
            let arr = [];
            for (let i = 0; i < res.data.results.length; i++) {
              arr.push({
                _id: i,
                name: res.data.results[i].name,
                latitude: res.data.results[i].latitude,
                longitude: res.data.results[i].longitude,
                country: res.data.results[i].country,
                admin1: res.data.results[i].admin1,
                admin2: res.data.results[i].admin2,
              });
            }
            setCities(arr);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  return (
    <div style={styles.container}>
      <Text style={styles.heading}>
        <BiCurrentLocation />
        &nbsp; Type your location
      </Text>
      <div style={styles.input_row}>
        <TextInput
          onChangeText={setCityName}
          value={cityName}
          style={styles.city_input_box}
          placeholder={"Enter your city name"}
          placeholderTextColor={cnt.color.dark.primary}
        />
        <button style={styles.search_btn} onClick={getCititesFromCityName}>
          Search
        </button>
      </div>
      {cities.length > 0 ? (
        <div>
          <Text style={{ color: "white", fontWeight: "600" }}>
            Select any one from the following list
          </Text>
          {cities.map((city) => (
            <CityTile onClickCallback={getSelectedLocationId} data={city} />
          ))}
          <br />
          <br />
        </div>
      ) : (
        <></>
      )}
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
  input_row: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "8px",
    paddingBottom: "8px",
    columnGap: "10px",
    rowGap: "10px",
  },
  city_input_box: {
    width: "-webkit-fill-available",
    color: "white",
    borderRadius: "5px",
    border: "1px solid #ffffff88",
    padding: "5px",
  },
  search_btn: {
    backgroundImage: `linear-gradient(to right, rgb(133 68 130) 0%, rgb(101 4 155) 100%)`,
    textAlign: "center",
    textTransform: "uppercase",
    transition: "0.5s",
    color: "white",
    borderRadius: "5px",
    border: "none",
  },
  city_tile: {
    tile: {
      width: "-webkit-fill-available",
      padding: "5px",
      borderRadius: "5px",
      marginTop: "10px",
      marginBottom: "10px",
      backgroundImage: `linear-gradient(to right, rgb(125 73 157) 0%, rgb(5 109 161) 100%)`,
      display: "flex",
      flexDirection: "column",
    },
    line: {
      color: "white",
      fontWeight: "400",
    },
    coords: {
      color: "white",
      fontWeight: "400",
      fontSize: "0.9rem",
      fontStyle: "italic",
    },
  },
});
