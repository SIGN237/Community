import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Image, FlatList, Dimensions, KeyboardAvoidingView} from 'react-native'

import {Ionicons,MaterialIcons,MaterialCommunityIcons,Entypo} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';
import Constants from 'expo-constants' 
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
//import * as ImagePicker from 'expo-image-picker'
import { TouchableHighlight, TouchableOpacity, } from 'react-native-gesture-handler'
import {LinearGradient} from 'expo-linear-gradient'
import UserPermissions from "../utilities/UserPermissions"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AwesomeButton from "react-native-really-awesome-button";
import { StatusBar } from 'expo-status-bar';
import Test from './Test'

import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImagePicker from 'react-native-image-crop-picker';
//import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheet from "react-native-raw-bottom-sheet";
import Animated from 'react-native-reanimated';
import { Button } from 'react-native';
const firebase = require('firebase')

require("firebase/firestore")
//require("firebase/firebase-storage")

const { height, width } = Dimensions.get('window');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH *  0.85);
//const ITEM_WIDTH = Dimensions.get('window').width;


export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resourcePath: {},
            imageList: [],
            //image: null,
            //newDataImage: []
        };
      }
      
      state = {
          text: "",
          image: null,
          //images: null
      }
      
      componentDidMount() {
          UserPermissions.getCameraPermission()
      }

      /*onSelectedImage = (image) => {
          let newDataImage = this.state.imageList
          const source = {uri: image.path}
          let item = {
              id: Date.now(),
              url: source,
              content: image.data,
              size: image.size
          }
          //console.log(item)
          newDataImage.push(item)
          this.setState({imageList: newDataImage})
          //console.log(newDataImage)
          //uploadImageTest(newDataImage)
          
      }*/

      cameraLaunch = () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
          mediaType: "any"
        }).then(image => {
          //console.log(image);
          //this.onSelectedImage(image)
          this.setState({
            image: {
                uri: image.path,
              }
          })
        }).catch(err => {
          console.log(' Error fetching image from Camera roll ', err);
      });
      }
    
      imageGalleryLaunch = () => {
        ImagePicker.openPicker({
          waitAnimationEnd: false,
          //includeExif: true,
          includeBase64: true,
          forceJpg: true,
          maxFiles: 10,
          //compressImageQuality: 0.8,
          //multiple: true,
          mediaType: "photo",
          //cropping: true
        }).then(image => {
          //console.log(image);
          //this.onSelectedImage(image)
          this.setState({
              image: {
                uri: image.path,
              }
          })
          //this.onSelectedImage(images)
        }).catch(err => {
          console.log(' Error fetching images from gallery ', err);
        });
      }  


      uploadImage = async () => {
        const uri = this.state.image//uri of image
        const childpath = `Posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        const response = await fetch(uri)
        const blob = await response.blob()
    
        const task = firebase
            .storage()
            .ref()
            .child(childpath)
            .put(blob)
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
    
        const taskCompleted = () =>  {
          task.snapshot.ref.getDownloadUrl().then((snapshot) => {
            savePostData(snapshot)
            console.log(snapshot)
          })
        }
    
        const taskError = snapshot => {
          console.log(snapshot)
        }
    
        task.on("state_changed", taskProgress, taskError, taskCompleted)
      }
    
      savePostData = (downloadUrl) => {
        
        firebase.firestore()
          .collection("Posts")
          .doc(firebase.auth().currentUser.uid)
          .collection("UserPosts")
          .add({
            downloadUrl,
            text,
            creation: firebase.firestore.FieldValue.serverTimestamp()
          }).then(function () {
            //this.props.navigation.popToTop()
            this.props.navigation.goBack()
          })
      }
      handlePost = () => {
        Fire.shared.addPost({localUri: this.state.image, text: this.state.text.trim() })
        .then(ref => {
            this.setState({image: null, text: ""})
            this.props.navigation.goBack()
        }).catch(error => {
            alert(error)
        })
    }

    

        /*pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            })

        

            if(!result.cancelled) {
                this.setState({image:  result.uri})
            }
        }*/

    render() {
        let {imageList, activeSlide} = this.state
        return (
            <View style={styles.container}>
                <StatusBar style="dark"/>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="md-arrow-back" size={26} color="#000"></Ionicons>
                        </TouchableOpacity>
                        <TouchableOpacity
                         /*onPress={() => this.props.navigation.navigate("Test", imageList)}*/
                         onPress={this.handlePost}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Image source={require('../assets/images/bg1.jpg')} style={styles.avatar}></Image>
                        <View style={{paddingTop: 4}}>
                        <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={2}
                        style={{flex:1,fontSize: 17,borderBottomWidth : 2.5, paddingBottom: -25, top: hp("-1.2%")}}
                        placeholder="Want to share something?"
                        placeholderTextColor={"black"}
                        onChangeText={text => this.setState({text})}
                        value={this.state.text}
                        ></TextInput>
                        </View>
                    </View>
                    <View>
                        <Image style={styles.image} source={/*uri:*/ this.state.image} />
                    </View>
                    <TouchableOpacity 
                        activeOpacity={.5}
                        style={{justifyContent: "center",alignItems: "center",}}
                        onCh
                        onPress={this.imageGalleryLaunch}>
                        <Text
                         style={styles.textBtn}>Select a Pic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={.5}
                        style={{justifyContent: "center",alignItems: "center",}}
                        onPress={this.cameraLaunch}>
                        <Text style={styles.textBtn2}>Take a Pic</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        top: hp("6%"),
        flexDirection: "row",
        justifyContent: "space-between",
        //backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row",
        right: wp("4%"),
        top: hp("4%"),
        //borderWidth: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        right: wp("1.5%"),
        marginRight: 10
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 20
    },
    image: {
        marginHorizontal: 10,
        marginTop: 40,
        height: 315,
        //width: width,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "transparent",
        //resizeMode: "center"
    },
    textBtn: {
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 25,
        backgroundColor: "white",
        shadowOffset: {width: 2, height: 2},
        shadowColor: "black",
        shadowOpacity: 2,
        elevation: 3,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        textAlign: 'center',
        textAlignVertical: "center",
        marginTop: hp("5%"),
        height: 40,
        width: width/1.9
    },
    textBtn2: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: "transparent",
        backgroundColor: "white",
        shadowOffset: {width: 2, height: 2},
        shadowColor: "black",
        shadowOpacity: 2,
        elevation: 3,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        textAlign: 'center',
        marginTop: hp("7%"),
        textAlignVertical: "center",
        height: 40,
        width: width/1.9
    },
})
    
