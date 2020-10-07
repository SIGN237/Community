import React from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';

import { LinearGradient } from "expo-linear-gradient";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CircleButton extends React.Component {
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
          </TouchableOpacity>
        </LinearGradient>
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
    marginHorizontal: 75,
    marginTop: hp("26.5%"),
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
});