import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'

import * as firebase from 'firebase'

export default class LoadingScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
      }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }
    render() {
        return (
            <View styles={styles.container}>
                <Text styles={styles.container}>Loading Screen</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
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