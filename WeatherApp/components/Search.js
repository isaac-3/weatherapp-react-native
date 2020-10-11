import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button, Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { colors } from '../utils';

const Search = ({getNewLoc}) => {

    const [input, setInput] = useState("")

    const handleSumbit = () => {
        getNewLoc(input)
        setInput("")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputCont}>
                <Input
                value={input}
                onChangeText={(e)=>setInput(e)}
                onSubmitEditing={()=>handleSumbit()}
                placeholder='Search'
                leftIcon={
                    <Icon
                    name='search'
                    size={20}
                    color={colors.PRIMARY_COLOR}
                    />
                }
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    inputCont: {
        width: 125,
        alignSelf: "center"
    },
})
 
export default Search;