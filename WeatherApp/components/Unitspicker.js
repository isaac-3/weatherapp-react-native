import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-community/picker";

const Unitspicker = ({ units, setUnits }) => {
    return (
        <View style={styles.unitsCont}>
            <Picker
                selectedValue={units}
                onValueChange={(item) => setUnits(item)}
                mode="dropdown"
                itemStyle={{ fontSize: 12 }}
            >
                <Picker.Item label="F°" value="imperial" />
                <Picker.Item label="C°" value="metric" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    unitsCont: {
        position: "absolute",
        ...Platform.select({
            ios: {
                top: -20,
            },
            android: {
                top: 50,
            },
        }),
        left: 20,
        height: 50,
        width: 100,
    },
});

export default Unitspicker;
