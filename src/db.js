import firebase from "firebase/app";
import "firebase/database";

const config={
    apiKey: "AIzaSyD9iUr276ZcUKeIkVGbHjOGhmHnRbZYW7s",
    authDomain: "fourxstagroupchat-82fca.firebaseapp.com",
    projectId: "fourxstagroupchat-82fca",
    storageBucket: "fourxstagroupchat-82fca.appspot.com",
    messagingSenderId: "913040905343",
    appId: "1:913040905343:web:df18df3b2a2da16913db4a"
}

const db = firebase.initializeApp(config);
export default db;