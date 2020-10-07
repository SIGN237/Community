import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import * as firebase from 'firebase'
import Fire from "../Fire"
import {Ionicons} from '@expo/vector-icons'
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";

import UserPermissions from "../utilities/UserPermissions"
import * as ImagePicker from "expo-image-picker"
const {width, height} = Dimensions.get('window');


export default class RegistrationScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          //name: "",
          user: {
            userName: "",
            email: "",
            password: "",
            avatar: null
          },
          errorMessage: null
        };
      }

      handlePickAvatar = async () => {
        UserPermissions.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          //aspect: [4, 3]
          quality: 1
        })

        if (!result.cancelled) {
          this.setState({user: {...this.state.user, avatar: result.uri }})
        }
      }

      handleEmailSignUp = () => {
        Fire.shared.createUser(this.state.user)
      }


    render() {
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
                  <View
                    style={{ position: "absolute",top: 64, alignItems: "center", width: "100%"}} >
                    <TouchableOpacity onPress={this.handlePickAvatar} style={styles.avatarPlaceholder}>
                      <Image source={{uri:this.state.user.avatar}} style={styles.avatar}/>
                      <Ionicons
                        name="md-add" size={40} color="white"
                        style={{marginTop: 6, marginHorizontal: 2}}
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.inputTitle}>Username</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onChangeText={userName => this.setState({ user: { ...this.state.user, userName } })}
                      value={this.state.user.userName}
                    ></TextInput>
                  </View>
                  <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Email Address or Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
                      value={this.state.user.email}
                    ></TextInput>
                  </View>
                  <View style={{marginTop: 32}}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
                      value={this.state.user.password}
                    ></TextInput>
                  </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleEmailSignUp}>
                  <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: "center",marginTop: 20}}
                 onPress={() => this.props.navigation.navigate("Login")}>
                  <Text style={{color: "white",fontSize: 15}}>
                    Have an account? <Text style={styles.signup}>Login</Text>
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
    marginTop: 130,
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
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    /*backgroundColor: "#8A8F9E",
    marginTop: -190,
    justifyContent: "center",
    alignItems: "center"*/
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8A8F9E",
    marginTop: -190,
    justifyContent: "center",
    alignItems: "center"
  }
 
})