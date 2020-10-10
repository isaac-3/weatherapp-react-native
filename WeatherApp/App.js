import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import Weatherinfo from "./components/Weatherinfo";
import Unitspicker from "./components/Unitspicker";
import Reloadicon from "./components/Reloadicon";
import Weatherdetails from "./components/Weatherdetails";
import { colors } from "./utils";

const API_KEY = "c6a50ce34f4caaaba9f91a8a6f24292e";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
    const [errMsg, setErrMsg] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [units, setUnits] = useState("imperial");

    useEffect(() => {
        load();
    }, [units]);

    async function load() {
        setCurrentWeather(null);
        setErrMsg(null);
        try {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                setErrMsg("Aceess to location is needed");
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`;
            fetch(weatherUrl)
                .then((res) => res.json())
                .then((res) => {
                    setCurrentWeather(res);
                });
        } catch (error) {
            setErrMsg(error.message);
        }
    }
    if (currentWeather) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.main}>
                    <Unitspicker units={units} setUnits={setUnits} />
                    <Reloadicon load={load} />
                    <Weatherinfo currentWeather={currentWeather} />
                </View>
                <Weatherdetails currentWeather={currentWeather} />
            </SafeAreaView>
        );
    } else if (errMsg) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: "center" }}>{errMsg}</Text>
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    main: {
        flex: 1,
        justifyContent: "center",
    },
});
