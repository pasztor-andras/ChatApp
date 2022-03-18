import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdmgj7qzzVSbBMgXYaVrVJ9_RSQdnj200",
    authDomain: "let-s-chat-3cfb6.firebaseapp.com",
    projectId: "let-s-chat-3cfb6",
    storageBucket: "let-s-chat-3cfb6.appspot.com",
    messagingSenderId: "678143885235",
    appId: "1:678143885235:web:f7d943c2658c1eaaf495c6"
  };


  // firebase.initializeApp(firebaseConfig)

  let app;

  if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };