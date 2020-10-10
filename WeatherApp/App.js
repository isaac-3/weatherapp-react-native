import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [errMsg, setErrMsg] = useState(null);
  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Aceess to location is needed");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      alert(`${latitude}, ${longitude}`);
    } catch (error) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your appp!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
