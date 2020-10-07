import React from 'react'
import {View, Text, StyleSheet, StatusBar, Image, Dimensions, Platform, useWindowDimensions, TouchableHighlightBase} from 'react-native'

import * as firebase from 'firebase'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale, ScaledSheet  } from 'react-native-size-matters';
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from '../src/components/Header';
import {Ionicons,MaterialIcons,Entypo} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import CircleButton from '../src/components/CircleButton'

const { width, height } = Dimensions.get('window');
//const {windowWidth,windowHeight} = useWindowDimensions()
//const windowHeight = useWindowDimensions().height;

//const backgroundImage = require('../assets/images/bg1.jpg')

export default class HomeScreen extends React.Component{
    constructor(props) {

        super(props);
    
        this.state = {
            height: Dimensions.get('window').height
        };
    }

    
    
    render() {
        return (
            <View style={{backgroundColor: '#FFFAFA'}}>
                <StatusBar translucent backgroundColor="transparent"/>
                <Header
                    image={true}
                    imageSource={require('../assets/images/bg1.jpg')}
                />
                <CircleButton
                    onPress={() => this.props.navigation.navigate("Account")}
                    circleDiameter = {55}
                    gradientColors = {["#6E00DD","#A826C7"]}>
                    <Ionicons
                        name="md-add" size={22} color="blue"
                        style={{marginTop: 2, marginHorizontal: 17}}
                      ></Ionicons>
                </CircleButton>
                <LinearGradient
                    style={styles.avatar}
                    colors={["#6E00DD","#A826C7"]}>
                    <TouchableOpacity>
                        <Image
                            style={{marginLeft: 15}}
                            source={ require('../src/icons/plus-phone.png') } />
                        <MaterialIcons
                        style={{marginTop: -8, marginHorizontal: -4}}
                        name="phone" size={30} color="white"></MaterialIcons>
                    </TouchableOpacity>
                </LinearGradient>
                
            </View>
        );
    }
}
/*<Text>Hi {this.state.email}</Text>
                <Text>{this.state.displayUserName}</Text>
                <TouchableOpacity style={{marginTop:32}} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>*/ 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    image: {
        //height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: "stretch",
        resizeMode: "cover"
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: "bold"
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        backgroundColor: "white"
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    sectionContent: {
        fontSize: 16,
        textAlign: "justify"
    },
    categories: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    categoryContainer: {
        flexDirection: "row",
        backgroundColor: "#FF6347",
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15,
    },
    category: {
        fontSize: 14,
        color: "#fff",
        marginLeft: 10
    },
    titleContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center"
    },
    imageTitle: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: 24
    },
    navTitleView: {
        //height: MIN_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 40 : 5,
        opacity: 0
    },
    navTitle: {
        color: "white",
        fontSize: 18,
        backgroundColor: "transparent"
    },
    sectionLarge: {
        minHeight: 300
    },
    triangle: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 0,
        height: 10,
        left: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: Dimensions.get('window').width,
        borderRightWidth: 0,
        borderBottomWidth: 35,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 50,
        marginTop: hp("-6.6%"),
        //height: hp('55%'), 
        //width: wp('55%'),
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center"
    },
})

const styles1 = ScaledSheet.create({
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        //padding: '2@msr', // = Math.round(moderateScale(2))
        marginTop: scale(-55)
    },
    row: {
        padding: '10@ms0.3', // = moderateScale(10, 0.3)
        width: '50@ms', // = moderateScale(50)
        height: '30@mvs0.3' // = moderateVerticalScale(30, 0.3)
    }
});