import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import * as firebase from 'firebase'
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";


const {width, height} = Dimensions.get('window');


export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          errorMessage: null
        };
      }

    handleEmailLogin = () => {
      const { email, password } = this.state;

      firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .catch(error => this.setState({ errorMessage: error.message}))
    }


    render() {
      const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
              <ImageBackground
                source={require("../assets/images/fire.jpg")}
                style={{ width: "100%", height: "100%", flex: 1}}
                >
                <View style={styles.errorMessage}>
                  {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                  <View>
                    <Text style={styles.inputTitle}>Email Address or Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                    ></TextInput>
                  </View>
                  <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={password => this.setState({ password })}
                      value={this.state.password}
                    ></TextInput>
                  </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleEmailLogin}>
                  <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center",marginTop: 20}}
                 onPress={() => this.props.navigation.navigate("Register")}>
                  <Text style={{color: "white",fontSize: 15}}>
                    New to Community? <Text style={styles.signup}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  text: {
    textAlign:"center",
    color:"white",
    fontSize: 20,
    fontFamily: "bold",
  },
  errorMessage: {
    //height: 150
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"

  },
  errorText: {
    color:"#0087d4",
    fontSize: 20,
    fontFamily: "bold",
  },
  form: {
    marginTop: 110,
    marginBottom: 40,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    fontFamily: "bold",
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 17,
    color: "white"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#0087d4",
    borderRadius: 25,
    height: 52,
    shadowOffset: {width: 2, height: 2},
    shadowColor: "black",
    shadowOpacity: 2,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  signup: {
    textAlign:"center",
    color:"#0087d4",
    fontSize: 15,
    fontFamily: "italic",
  }
 
})