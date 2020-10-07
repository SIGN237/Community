import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    ImageBackground
} from "react-native";

import Svg, {Image,Circle,ClipPath} from 'react-native-svg'

import Animated, { Easing } from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'

import image from './assets/images/bg_register.jpg'

const {width, height} = Dimensions.get('window')

const {Value, event, block,cond, eq, set, Clock, startClock, stopClock,
debug, timing, clockRunning, interpolate, Extrapolate, concat} = Animated

function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 1500,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }

class Community extends Component {
    constructor() {
        super()

        this.buttonOpacity = new Value(1)

        this.onStateChange = event([
            {
                nativeEvent:({state})=>block([
                    cond(eq(state,State.END),set(this.buttonOpacity, 
                        runTiming(new Clock(),1,0)))
                ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent:({state})=>block([
                    cond(eq(state,State.END),set(this.buttonOpacity, 
                        runTiming(new Clock(),0,1)))
                ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[200,0],
            extrapolate:Extrapolate.CLAMP
        });

        this.buttonX = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[1,-1],
            extrapolate:Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[-height , 0],
            extrapolate:Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[1, -1],
            extrapolate:Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[0,100],
            extrapolate:Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[1, 0],
            extrapolate:Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity,{
            inputRange:[0,1],
            outputRange:[180, 360],
            extrapolate:Extrapolate.CLAMP
        });
    }
    
    render() {
        return (   
            <View style={{flex: 1, backgroundColor: 'white',
                justifyContent: "center"}}>
                
                <Animated.View style={{...StyleSheet.absoluteFill
                , transform:[{translateY: this.bgY}]}}>
                <Svg height={height} width={width}>
                    <Image
                        href={require('./assets/images/bg6.jpg')}
                        //source={require('../assets/bonefire.png')}
                        //source={require('../assets/1.jpg')}
                        width={width}
                        height={height}
                        preserveAspectRatio='xMidYMid slice'
                        clipPath="url(#clip)"
                    />
                </Svg>
                </Animated.View>
                <Animated.View style={{...styles.text,opacity:this.buttonOpacity,
                    transform:[{translateY: this.buttonY}]}}>
                    <Animated.Text style={{color: 'white', fontSize: 30,
                    fontWeight: 'bold',marginVertical:3,
                    transform:[{translateX:this.buttonX}]}}>
                    Welcome To Community</Animated.Text>
                </Animated.View>
                <View style={{ height: height / 1.45 }}>
                    <View style={styles.center}>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View style={{...styles.button, opacity: this.buttonOpacity
                            , transform:[{translateY: this.buttonY}]}}>
                                <Text style={{color: 'white', fontSize: 25,fontFamily: "bold"}}
                                >Get started</Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </View>
                    <Animated.View
                        style={{
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform:[{translateY:this.textInputY}],
                            height: height / 1.5,
                            ...StyleSheet.absoluteFill,
                            top:null,
                            justifyContent:"center"}}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{fontSize:17,fontWeight:"bold",
                                transform:[{rotate:concat(this.rotateCross,'deg')}]}}>X</Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <TextInput
                            placeholder="PhoneNumber"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <Animated.View style={styles.button1}>
                            <Text style={{fontSize:20,fontWeight: "bold",/*fontFamily: "regular"*/
                            color: "black"}}>SIGN UP</Text>
                        </Animated.View>
                    </Animated.View>
                </View>
            </View>

        
            
        );
    }
}
export default Community;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        marginVertical: 40,
    },
    button: {
        backgroundColor: 'transparent',
        opacity: 0.5,
        height: 60,
        marginHorizontal: 85,
        marginVertical: 25,
        borderWidth: 2.5,
        borderColor: 'white',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    button1: {
        backgroundColor: 'white',
        height: 60,
        marginHorizontal: 20,
        //marginVertical: 35,
        marginTop: 85,
        //borderWidth: 2.5,
        shadowOffset: {width: 2, height: 2},
        shadowColor: "black",
        shadowOpacity: 1.5,
        elevation: 5,
        //borderColor: 'white',
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        marginVertical: 120,
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderRadius: 1,
        borderTopColor: 'white',
        borderLeftColor: 'transparent',
        borderBottomColor: 'white',
        borderRightColor: 'transparent',
        justifyContent: 'center'
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -10,
        left: width / 2- 20,
        shadowOffset: {width: 2, height: 2},
        shadowColor: "black",
        shadowOpacity: 1.5,
        elevation: 3,
        
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        marginVertical: 5,
        paddingLeft: 10,
        borderColor: 'gray',
        //backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30

    },
    images: {
        height: "100%",
        width: "100%"
    },
    
});