import React, { Component } from 'react';
import {NavigationContainer,DefaultTheme } from '@react-navigation/native'
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack'
import { createCompatNavigatorFactory, createSwitchNavigator } from '@react-navigation/compat'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Platform,
  TouchableOpacity,
  ImageBackground
  } from 'react-native';

import {Asset} from 'expo-asset'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import Onboarding from './Onboarding';
import AppIntroSlider from 'react-native-app-intro-slider'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'

import Community from './Onboarding'



import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen'

import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import SettingsScreen from './screens/SettingsScreen'

import SwitchNavigator from './app/navigation/SwitchNavigator'
import AuthNavigator from './app/navigation/AuthNavigator'
import BottomTabsNavigator from './app/navigation/BottomTabsNavigator'

import firebase from './Firebase'

width: Dimensions.get('window').width

/*function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{width: "100%", flex: 1}}>
        <ImageBackground
          source={require("./assets/images/fire.jpg")}
          style={{ width: "100%", height: "100%", flex: 1}}
          >
          <TouchableOpacity onPress={() =>{
            navigation.navigate("Register")
          }}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  )
}

function RegistrationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{width: "100%", flex: 1}}>
        <ImageBackground
          source={require("./assets/images/fire.jpg")}
          style={{ width: "100%", height: "100%", flex: 1}}
        >
        <TouchableOpacity onPress={() =>{
            navigation.navigate("Login")
        }}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  )
}

function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

function LoadingScreen() {
  return (
    <View>
      <Text>Loading Screen</Text>
    </View>
  )
}*/

/*const BottomTab = createBottomTabNavigator()
return(
  <BottomTab.Navigator
  tabBarOptions= {{
    activeTintColor: "#0087d4",
    inactiveTintColor: "#BBBBC4",
    showLabel: false,
    backgroundColor: "transparent"
}}
>
  <BottomTab.screen
    name="Home" component={HomeScreen}
    navigationOptions={{
      tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={24} color={tintColor}/>
    }}
  />
  <BottomTab.screen
    name="Chat" component={ChatScreen}
    navigationOptions={{
      tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatbubbles" size={24} color={tintColor}/>
    }}
  />
  <BottomTab.screen
    name="Profile" component={ProfileScreen}
    navigationOptions={{
      tabBarIcon: ({tintColor}) => <Ionicons name="md-contact" size={24} color={tintColor}/>
    }}
  />
</BottomTab.Navigator>
)*/

/*const AppTabNavigator = createCompatNavigatorFactory(createBottomTabNavigator)(
  {
      Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={24} color={tintColor}/>
          }
      },
      Chat: {
        screen: ChatScreen,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatbubbles" size={24} color={tintColor}/>
        }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Ionicons name="md-contact" size={24} color={tintColor}/>
        }
      },
  }
  
  
)*/

/*const AppStack = createCompatNavigatorFactory(createStackNavigator)({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
});*/
/*const AuthStack = createCompatNavigatorFactory(createStackNavigator)({
  Login: { 
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    }
  },
  Register: {
    screen: RegistrationScreen,
    navigationOptions: {
      headerShown: false,
    }
  }
  
});
const SwitchNavigator= createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack
},
{
  initialRouteName:'Loading'
}
);*/
  

function MyMain(){
  return(
    <Main.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
    <Main.Screen
      name="Login"
      component={LoginScreen}/>
    <Main.Screen
      name="Register"
      component={RegistrationScreen}
      options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
    />
    <Main.Screen
      name="Profile"
      component={ProfileScreen}/>
    <Main.Screen
      name="Home"
      component={HomeScreen}/>
    <Main.Screen
      name="Loading"
      component={LoadingScreen}
    />
    </Main.Navigator>
  )
}

const slides = [
  {
    key: "one",
    title: "Welcome To Community",
    text: "",
    image: require('./assets/images/bg1.jpg'),
    //titleStyle: styles.title,
    //textStyle: styles.text,
    //imageStyle: styles.image,
  },
  
  {
    key: "two",
    title: "Union",
    text: "We bring people together",
    image: require('./assets/images/bg2.jpg'),
    //titleStyle: styles.title,
    //textStyle: styles.text,
    //imageStyle: styles.image,
  },
  {
    key: "three",
    title: "Community 3",
    text: "Fuck this shit I'm out",
    image: require('./assets/images/bg3.jpg'),
    //titleStyle: styles.title,
    //textStyle: styles.text,
    //imageStyle: styles.image,
  },
  {
    key: "four",
    title: "Community 4",
    text: "Fuck this shit I'm out",
    image: require('./assets/images/bg4.jpg'),
    //titleStyle: styles.title,
    //textStyle: styles.text,
    //imageStyle: styles.image,
  },
  {
    key: "five",
    title: "Community 5",
    text: "Fuck this shit I'm out",
    image: require('./assets/images/bg6.jpg'),
    //titleStyle: styles.title,
    //textStyle: styles.text,
    //imageStyle: styles.image,
  },
]


const {width, height} = Dimensions.get('window');

const Main = createStackNavigator();
const ChatStack = createStackNavigator();


function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
   );
 }
 const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFAFA'
  },
};


export default class App extends React.Component{
  
  state = {
    assetsLoaded: false,
    //to show intro slider once
    //loading: true
  };
  async componentDidMount() {
    await Font.loadAsync({
        'regular': require('./assets/fonts/Merriweather/Merriweather-Regular.ttf'),
        'bold': require('./assets/fonts/Merriweather/Merriweather-Bold.ttf'),
        'italic': require('./assets/fonts/Merriweather/Merriweather-BoldItalic.ttf')
    });
    //to show intro slider once
    /*AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ show_Main_App: !!value, loading: false });
    });*/
    //\\
    this.setState({ assetsLoaded: true });
  }

  on_Done_all_slides = () => {
    //to show intro slider once
    /*AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ show_Main_App: true });
        this.props.navigation.navigate('Loading')
    });*/
    //\\
    this.setState({ show_Main_App: true });
  };
  /*on_Skip_slides = () => {
    this.setState({ show_Main_App: true });
  };*/
  state = {show_Main_App: false}
  _renderItem = ({item}) => {
    const {assetsLoaded} = this.state;
    if(assetsLoaded) {
      return(
        <View style={{flex:1}}>
          <ImageBackground
          source={item.image}
            style={styles.images}
          >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          </ImageBackground>
        </View>
      )
    }
  }

  
  
  render() {
    const {assetsLoaded} = this.state;
    //to show intro slider once
    //if (this.state.loading) return <ActivityIndicator size="large" />
    if(assetsLoaded && this.state.show_Main_App) {
      //if (this.state.show_Main_App) {
        return (
          <NavigationContainer theme={MyTheme}>
            <Main.Navigator initialRouteName='Loading' /*headerMode='none'*/>
              <Main.Screen
                name='Loading'
                component={SwitchNavigator}
                options={{
                    headerTitle: false,
                    headerTransparent: true
                  }}  />
              <Main.Screen
                  options={{
                    headerTitle: false,
                    headerTransparent: true,
                    //cardStyle: {backgroundColor: "#FFFAFA"}
                  }} 
                /*options={{
                  title: "Test",
                  height: "50%",
                  headerTitle: (props) => ( // App Logo
                    <Image
                      style={{ width: "100%", height: 50 }}
                      source={require('./assets/images/SplashScreen.jpg')}
                      resizeMode='cover'
                    />
                  ),
                }}*/
                name='BottomTabsNavigator'
                component={BottomTabsNavigator}/>
              <Main.Screen name='AuthNavigator' component={AuthNavigator}
                options={{
                    headerTitle: false,
                    headerTransparent: true,
                    //cardStyle: {backgroundColor: "#FFFAFA"}
                  }}
              />
            </Main.Navigator>
          </NavigationContainer>
      );
      //} 
    }
    else {
      return (
        <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        onDone={this.on_Done_all_slides}
        showPrevButton={true}
        //showSkipButton={true} 
        //onSkip={this.on_Skip_slides}
        activeDotStyle={{
          backgroundColor:"#0087d4",
          width: 10
        }}
      />
      );
  }
  }
      
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  images: {
    height: "100%",
    width: "100%"
  },
  title: {
    paddingTop:100,
    paddingBottom: 10,
    fontSize:28,
    //fontWeight: "bold",
    fontFamily:"bold",
    color: "black",
    alignSelf: "center",
    textAlign: "center"
  },
  svgCurve: {
    position: 'absolute',
  },
  text: {
    textAlign:"center",
    color:"white",
    fontSize: 20,
    marginVertical: height / 1.75,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    paddingHorizontal:30
  },
 
})


