import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../src/components/HeaderAccount';
import CircleButton from '../src/components/CircleButtonAccount'
import {Ionicons,MaterialIcons,Entypo} from '@expo/vector-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import * as ImagePicker from 'expo-image-picker'

//const firebase = require('firebase')
//require("firebase/firestore")

export default class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
      }

      unFollow = null

      componentDidMount() {
        const user = this.props.uid || Fire.shared.uid
    
        this.unFollow = Fire.shared.firestore
            .collection("Users")
            .doc(user)
            .onSnapshot(doc => {
              this.setState({ user: doc.data() })
            })
      }
    
      componentWillUnmount() {
        this.unFollow()
      }
      

    render() {
        return (
            <View style={styles.container}>
                <Header
                        image={true}
                        //imageSource={require('../assets/images/bg1.jpg')}
                        imageSource={this.state.user.avatar
                        ? {uri: this.state.user.avatar}
                        : require("../assets/images/bg1.jpg")}
                    />
                <CircleButton
                    style={styles.circleButton}
                    circleDiameter = {75}
                    gradientColors = {["#6E00DD","#A826C7"]}>
                </CircleButton>
                <View style={styles.info}>
                    <Text style={styles.userName}>{this.state.user.userName}</Text>
                    <TouchableOpacity>
                    <MaterialIcons
                        style={{left: wp("4%")}}
                        name="star-border" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>426</Text>
                        <Text style={styles.statTitle}>Total post</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>1126</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>65</Text>
                        <Text style={styles.statTitle}>Friends with</Text>
                    </View>
                </View>
                <View style={styles.post}>
                    <View style={styles.textPost}>
                        <Text style={styles.text3}>Recent post</Text>
                        <Button onPress={() => {Fire.shared.signOut()}} style={styles.text3} title="Logout"/>
                        <Text style={styles.text3}>Best post</Text>
                    </View>
                </View>
                <View style={styles.postImageView}>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Post")}
                    activeOpacity={.5}>
                        <ImageBackground
                        source={require('../assets/images/bg1.jpg')}
                        imageStyle={{borderRadius: 25, borderWidth: 1}}
                        style={styles.postImage}>
                            <Ionicons style={styles.plus}
                        name="ios-add-circle-outline" size={60} color="white" />
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
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
    },
    userName: {
        fontWeight: "bold",
        fontSize: 20,
        color: "blue"
    },
    plus: {
        marginTop: hp("7%"),
        marginHorizontal: wp("5%")
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "black",
        backgroundColor: "white",
        shadowOffset: {width: 2, height: 2},
        shadowColor: "black",
        shadowOpacity: 2,
        elevation: 3,
        //margin: 32,
        top: hp("-22%")
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    statAmount: {
        fontSize: 21,
        fontWeight: "bold"
    },
    statTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#C3C5CD",
        marginTop: 3
    },
    text3: {
        fontSize: 17,
        justifyContent: "space-evenly",
        alignSelf: "stretch",
        borderBottomWidth: 5,
        borderBottomColor: "#9117CF",
        top: hp("3%")
    },
    info: {
        //top: hp("80%"),
        marginBottom: hp("27%"),
        //left: wp("2%")
        //aspectRatio: 2
    },
    post: {
        top: hp("-19.5%"),
        flexDirection: "row",
        justifyContent: "space-between",
        
    },
    textPost: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },
    postImageView: {
        top: hp("-14%"),
        left: wp("-32%")
        
    },
    postImage: {
        height: 150,
        width: 150,
    },
    plus: {
        top: hp("6%"),
        left: wp("13.5%"),
        backgroundColor: "transparent"
    },
    

})
