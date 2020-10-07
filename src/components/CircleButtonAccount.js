import React from 'react';
import {View, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Ionicons,MaterialIcons,Entypo} from '@expo/vector-icons'

import Fire from "../../Fire"

const { width, height } = Dimensions.get('screen');
export default class CircleButton extends React.Component {

  state = {
    user: {}
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

  render(){
    let localStyles = styles(this.props)

    return (
      <View style={localStyles.container}>

        <LinearGradient
          //start={[1, 0.5]}
          //end={[0, 0]}
          colors={this.props.gradientColors}
          style={localStyles.linearGradient}
        >
          <TouchableOpacity
            activeOpacity={.5}
            style = {localStyles.button}
            onPress = {this.props.onPress}
          >
            {this.props.children}
            <Image style={localStyles.avatar}
                        source={this.state.user.avatar
                        ? {uri: this.state.user.avatar}
                        : require("../../assets/images/bg1.jpg")}/>
          </TouchableOpacity>
        </LinearGradient>
        <Ionicons style={localStyles.plus}
          name="md-add-circle" size={24} color="black" />
      </View>
    )
  }
}

const gradientMargin = (circleDiameter) => {
  const ratio = (1 - gradientRatio(circleDiameter)) / 2

  return circleDiameter * ratio
}

const gradientRatio = (circleDiameter) => {
  if(circleDiameter < 100){
    return 0.88
  }else{
    return 0.96
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
  },
  linearGradient: {
    borderRadius: props.circleDiameter / 2,
    width: props.circleDiameter,
    height: props.circleDiameter,
    //marginHorizontal: width*2,
    marginTop: hp("-11%"),
    //marginTop: 205
  },
  button: {
    margin: gradientMargin(props.circleDiameter),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: (props.circleDiameter / 2) * gradientRatio(props.circleDiameter),
    width: props.circleDiameter * gradientRatio(props.circleDiameter),
    height: props.circleDiameter * gradientRatio(props.circleDiameter),
  },
  plus: {
    marginTop: hp("-4%"),
    marginLeft: wp("14%")
  },
  avatar: {
    width: props.circleDiameter * gradientRatio(props.circleDiameter),
    height: props.circleDiameter * gradientRatio(props.circleDiameter),
    borderRadius: 75
}
  
});