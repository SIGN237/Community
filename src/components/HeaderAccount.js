import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default class HeaderAccount extends Component {
  renderContent() {
    return (
      <View style={styles.content}>
        <View style={styles.left}>{this.props.left}</View>
        <View style={styles.center}>{this.props.center}</View>
        <View style={styles.right}>{this.props.right}</View>
      </View>
    );
  }

  renderHeaderWithImage() {
    return (
            <ImageBackground style={styles.container} source={this.props.imageSource}>
                {this.renderContent()}
                <View  />
            </ImageBackground>
      
    );
  }

  renderHeaderWithoutImage() {
    return (
      <View style={[{ backgroundColor: '#FFFAFA' }, styles.container]}>
        {this.renderContent()}
      </View>
    );
  }

  render() {
    return this.props.image
      ? this.renderHeaderWithImage()
      : this.renderHeaderWithoutImage();
  }
}

const styles = StyleSheet.create({
    container: {
    top: 0,
    position: 'absolute',
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderColor: '#FFFAFA',

    
    },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.315,
    height: Dimensions.get('window').height * 0.00005,
    backgroundColor: '#FFFAFA',
  },
  left: {
    marginHorizontal: 5,
  },
  center: {
    marginHorizontal: 5,
  },
  right: {
    marginHorizontal: 5,
  },
  triangleCorner: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    //borderRightWidth: Dimensions.get('window').width,
    borderLeftWidth:Dimensions.get('window').width,
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFAFA',
  }
});