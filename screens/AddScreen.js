import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class AddScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                >
                    <Text> AddScreen </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFAFA' 
    }

})
