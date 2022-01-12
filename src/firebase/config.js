import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBxL-wQGBsXvvv_StkeqL2XwYiXsDHHI4Q",
    authDomain: "dojo-253f7.firebaseapp.com",
    projectId: "dojo-253f7",
    storageBucket: "dojo-253f7.appspot.com",
    messagingSenderId: "760244778805",
    appId: "1:760244778805:web:7bde046917ecf3e4703e7c"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp, projectStorage }