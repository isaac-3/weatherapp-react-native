import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/index";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

const Weatherdetails = ({ currentWeather, units }) => {
    const {
        main: { feels_like, humidity, temp_max},
        wind: {speed},
    } = currentWeather;

    const windSpeed = units === "imperial" ? `${Math.round(speed)} miles/hr`: `${Math.round(speed)} m/s`

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }} >
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR}/>
                        <View>
                            <Text>Feels Like:</Text>
                            <Text style={styles.textSecondary}>{feels_like}°</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR}/>
                        <View>
                            <Text>Humidity:</Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR}}>
                <View style={{ ...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }} >
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR}/>
                        <View>
                            <Text>Wind Speed:</Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-high" size={25} color={PRIMARY_COLOR} />
                        <View>
                            <Text>Max Temp:</Text>
                            <Text style={styles.textSecondary}>{temp_max}°</Text>
                        </View>
                    </View>
                </View>
            </View>
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
    weatherDetailsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: "bold",
        marginTop: 8
    }
});

export default Weatherdetails;
