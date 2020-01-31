import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBDcvXSRoKcch5AvZyU700P6yBlwwHW6IQ",
  authDomain: "user-admin-8e8cc.firebaseapp.com",
  databaseURL: "https://user-admin-8e8cc.firebaseio.com",
  projectId: "user-admin-8e8cc",
  storageBucket: "user-admin-8e8cc.appspot.com",
  messagingSenderId: "1028160181555",
  appId: "1:1028160181555:web:d3ab56ca9404669dd99a46",
  measurementId: "G-XGBB37MDN9"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***
  currentUser = () => this.auth.currentUser;

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  questions = () => this.db.ref("questions");
}

export default Firebase;
