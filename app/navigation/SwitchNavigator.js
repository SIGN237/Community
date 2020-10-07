import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigator from './BottomTabsNavigator'
import AuthNavigator from './AuthNavigator'
import SplashScreen from 'react-native-splash-screen'

import * as firebase from 'firebase'
//import Fire from "../../Fire"

const SwitchNavigator = ({navigation}) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            navigation.replace(user ? "BottomTabsNavigator" : "AuthNavigator")
            //navigation.navigate(user ? "BottomTabsNavigator" : "AuthNavigator")
        })
      }, [])
/*const SwitchNavigator = ({navigation}) => {
    useEffect(() => {
        setTimeout(()=> {
            firebase.auth().onAuthStateChanged(user => {
                navigation.navigate(user ? "BottomTabsNavigator" : "AuthNavigator")
            })
        }, 3000)
      }, [])*/
      //SplashScreen.hide();
    
    /*setTimeout(()=> {
        navigation.replace("")
    }, 3000)*/
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            <ActivityIndicator size="large" color="#e9446a"></ActivityIndicator>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SwitchNavigator