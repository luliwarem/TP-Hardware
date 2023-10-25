import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import * as Location from "expo-location";
import axios from "axios";

export default function Clima() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=b8101b9c7d939a6aa5f0a033fbef87fa&units=metric`
      ); // acá hacemos la consulta de axios a la API
      setWeather(response.data);
      console.log(response.data)
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // https://www.npmjs.com/package/react-open-weather
  return (

    <View style={styles.container}>
      
     <Text style={styles.title}>Temperatura en {weather?.name}: {weather?.main?.temp}</Text> 
     <Text style={styles.title}>Clima: {weather?.weather?.[0].main}</Text>
     <View style={styles.container}>
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    width: 330,
    borderRadius: 20,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 15,
    placeholderTextColor: "gray",
    marginTop: 7,
  },
  image: {
    width: 300,
    height: 240,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padd: 50
  },
  item: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    marginTop: 7,
  },
  botoncito: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontFamily: "sans-serif",
    marginBottom: 10,
  },
});
