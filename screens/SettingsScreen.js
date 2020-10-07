import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Test")}>
                    <Text> SettingsScreen </Text>
                </TouchableOpacity>
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
