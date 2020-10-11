import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;

const Weatherinfo = ({ currentWeather, units }) => {
    const {
        main: { temp },
        weather: [deatils],
        name,
    } = currentWeather;

    const { icon, main, description } = deatils;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const deg = units === "imperial" ? "F" : "C"

    return (
        <SafeAreaView style={styles.weatherInfo}>
            <Text style={styles.nameText}>{name}</Text>
            <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
            <Text style={styles.textPrimary}>{Math.round(temp)} {deg}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            {/* <Text style={styles.textSecondary}>{main}</Text> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    weatherInfo: {
        marginTop: 20,
        alignItems: "center",
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weatherDescription: {
        textTransform: "capitalize",
        paddingTop: 24
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: "500",
        marginTop: 10,
    },
    nameText:{
        textTransform: "uppercase",
        fontSize: 24
    },
});

export default Weatherinfo;
