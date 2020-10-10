import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

const Weatherdetails = ({ currentWeather }) => {
    const {
        main: { feels_like, humidity },
    } = currentWeather;

    return (
        <View style={styles.weatherDetails}>
            <Text>{feels_like}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: "auto",
        margin: 16,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
});

export default Weatherdetails;
