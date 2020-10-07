import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCx3JBLJrNUG_iARSYWtcySgsol8ru2rHw",
    authDomain: "community-98cc3.firebaseapp.com",
    databaseURL: "https://community-98cc3.firebaseio.com",
    projectId: "community-98cc3",
    storageBucket: "community-98cc3.appspot.com",
    messagingSenderId: "357440112461",
    appId: "1:357440112461:web:0f26ad414790ba22471904",
    measurementId: "G-KQQQK23ZMM"
  };
  
  //firebase.initializeApp(firebaseConfig);
  const Firebase = firebase.initializeApp(config);
  export default Firebase;
  