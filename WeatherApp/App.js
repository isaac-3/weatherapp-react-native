// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ActivityIndicator, TextInput, StatusBar, Platform
} from "react-native";
import * as Location from "expo-location";
import Weatherinfo from "./components/Weatherinfo";
import Unitspicker from "./components/Unitspicker";
import Reloadicon from "./components/Reloadicon";
import Weatherdetails from "./components/Weatherdetails";
import { colors } from "./utils";
import Search from "./components/Search";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {

    const [errMsg, setErrMsg] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [units, setUnits] = useState("imperial");
    const [Sinput, setSinput] = useState("")


    useEffect(() => {
        load(currentWeather);
    }, [units]);
    
    const getNewLoc = (input) => {
        setSinput(input)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=c6a50ce34f4caaaba9f91a8a6f24292e`)
        .then(res=>res.json())
        .then(res=>{
            setCurrentWeather(res)
        })
    }

    const setNull = () => {
        load(null)
    }

    async function load(currentWeather) {
        if(!currentWeather){

            setErrMsg(null);
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== "granted") {
                    setErrMsg("Aceess to location is needed");
                    return;
                }
                const location = await Location.getCurrentPositionAsync();
                const { latitude, longitude } = location.coords;
                const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=c6a50ce34f4caaaba9f91a8a6f24292e`;
    
                const response = await fetch(weatherUrl)
    
                const result = await response.json()
    
                if (response.ok) {
                    setCurrentWeather(result)
                } else {
                    setErrMsg(result.message)
                }
            } catch (error) {
                setErrMsg(error.message);
            }
        }else if(Sinput){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Sinput}&units=${units}&appid=c6a50ce34f4caaaba9f91a8a6f24292e`)
            .then(res=>res.json())
            .then(res=>{
                setCurrentWeather(res)
            })
        }else{
            load()
        }
    }

    const statusBarColor = Platform.OS === 'ios' ? "dark-content" : "light-content";

    if (currentWeather) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="black" barStyle={statusBarColor} />
                <View style={styles.main}>
                    <Unitspicker units={units} setUnits={setUnits} />
                    <Reloadicon load={load} setNull={setNull} setSinput={setSinput}/>
                    <Weatherinfo currentWeather={currentWeather} units={units}/>
                </View>
                <Search getNewLoc={getNewLoc}/>
                <Weatherdetails currentWeather={currentWeather} units={units}/>
            </SafeAreaView>
        );
    } else if (errMsg) {
        return (
            <SafeAreaView style={styles.container}>
                <Reloadicon load={load} />
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
        backgroundColor: "lightblue",
        flex: 1,
        justifyContent: "center",
    },
    main: {
        flex: 1,
        justifyContent: "center",
    },
    textInput: {
        flex: 1
    },
});
