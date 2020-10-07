import React, { useEffect } from 'react'
import { StyleSheet, Dimensions, View, Image, Text, Platform } from 'react-native'
import MaskedView from '@react-native-community/masked-view'
//import { NavigationContainer } from "@react-navigation/native";
//import BottomTabsNavigator from './BottomTabsNavigator'
//import AuthNavigator from './AuthNavigator'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Ionicons,MaterialIcons,Entypo} from '@expo/vector-icons'
import {createStackNavigator} from '@react-navigation/stack'
import {LinearGradient} from 'expo-linear-gradient'


import HomeScreen from '../../screens/HomeScreen'
import ChatScreen from '../../screens/ChatScreen'
import SettingsScreen from '../../screens/SettingsScreen'
import AddScreen from '../../screens/AddScreen'
import Test from '../../screens/Test'
import AccountScreen from '../../screens/AccountScreen'
import PostScreen from '../../screens/PostScreen'
import Svg, { Stop, Defs, Path } from 'react-native-svg'
import SvgUri from 'react-native-svg-uri';
import { ReactComponent as Home } from '../../assets/Home.svg'


//const Tab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CreatePlaceholder = () => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);
const Add = () => <AddScreen/>


/*function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
   );
 }
 function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Test" component={Test}/>
    </ProfileStack.Navigator>
   );
 }*/
 function Tabs() {
   return (
    <Tab.Navigator
    tabBarOptions= {{
      activeTintColor: "#0087d4",
      inactiveTintColor: "#BBBBC4",
      //activeBackgroundColor: "#FFFAFA",
      showLabel: false,
      position: "bottom",
      style: {
        backgroundColor: "transparent",
        borderTopWidth: 0,
        position: 'absolute',
        opacity: 2,
        elevation: 1.5,
        //borderBottomColor: 'yellow',
        //borderBottomWidth: 5,
        //marginHorizontal: 50,
        //height: 100,
      },
      /*indicatorStyle: {
        borderBottomColor: 'yellow',source={require('../../assets/Home.svg')}
        borderBottomWidth: 5,
      }*/
  }}>
    <Tab.Screen
      backgroundColor="#FFFAFA"
      name="Home" component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) =>
                <Entypo name="home" size={size} color={"#CFD8DC","#546E7A"}/>
      }}/>
    <Tab.Screen
      name="Chat" component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Image source={require('../../assets/chat.png')}/>
      }}
      //<Ionicons name="ios-chatbubbles" size={size} color={color}/>
    />
    <Tab.Screen
      name="Create" component={CreatePlaceholder}
      options={{
        tabBarIcon: ({ color, size}) => (<Ionicons name="ios-notifications" size={33} color={"#CFD8DC","#546E7A"}/>)
      }}
      listeners={({ navigation }) => ({
        tabPress: e => {
          e.preventDefault();
          navigation.navigate('Add');
        },
      })}
    />
    <Tab.Screen
      name="Settings" component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size}) => (<Ionicons name="md-contact" size={size} color={color}/>)
      }}
    />
</Tab.Navigator>
   )
 }


export default function BottomTabsNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen backgroundColor="#FFFAFA" name="Settings" component={Tabs} />
      <ProfileStack.Screen name="Test" component={Test}/>
      <ProfileStack.Screen name="Account" component={AccountScreen}/>
      <ProfileStack.Screen
        options={{
          //title: "Post",
          //headerTitle: false,
          //headerShown: true,
          headerTintColor: "blue",
          /*headerStyle: {
            backgroundColor: 'transparent'
          },*/
          headerTitleStyle: {
            alignSelf: (Platform.OS === 'android') ? 'flex-end' : 'flex-end'
          }
        }}
        name="Post" 
        component={PostScreen}/>
      <ProfileStack.Screen name="Add" component={Add}
        options={{ animationEnabled: true }}
      />
    </ProfileStack.Navigator>
  )
}