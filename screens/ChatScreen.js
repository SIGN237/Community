import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'

export default class ChatScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/images/bg_register.jpg")}
                    style={{ width: "100%", height: "100%", flex: 1}}>
                    <Text> </Text>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

})
