import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils";

const Realoadicon = ({ load, setNull, setSinput }) => {

    const iconName = Platform.OS === "ios" ? "ios-refresh" : "md-refresh";

    const reload = () => {
        setSinput()
        setNull()
    }

    return (
        <View style={styles.realoadIcon}>
            <Ionicons
                onPress={() => reload()}
                name={iconName}
                size={24}
                color={colors.PRIMARY_COLOR}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    realoadIcon: {
        position: "absolute",
        ...Platform.select({
            ios: {
                top: 50,
            },
            android: {
                top: 70,
            },
        }),
        right: 20,
    },
});

export default Realoadicon;
