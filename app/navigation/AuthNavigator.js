import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";

/*import SwitchNavigator from './app/navigation/SwitchNavigator'
import AuthNavigator from './app/navigation/AuthNavigator'
import BottomTabsNavigator from './app/navigation/BottomTabsNavigator'*/

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'

import LoginScreen from '../../screens/LoginScreen'
import RegistrationScreen from '../../screens/RegistrationScreen'


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function AuthNavigator({ navigation }) {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen
            name="Login"
            component={LoginScreen}
            />
            <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
            />
    </Stack.Navigator>
    );
  }