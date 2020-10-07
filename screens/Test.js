import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

require("firebase/firestore")
require("firebase/firebase-storage")

export default class Test extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        //imageList: [],
    };
  }
  uploadImage = async () => {
    const uri = this.state.imageList//uri of image

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
        this.props.navigation.popToTop()
      })
  }
  render() {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.uploadImage}>
        <Text> textInComponent </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})
