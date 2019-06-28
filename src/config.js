import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBRoNH1k6BNP0ivcrWr9YVcWY8aeYoXxUE",
    authDomain: "boardgame-e40ba.firebaseapp.com",
    databaseURL: "https://boardgame-e40ba.firebaseio.com",
    projectId: "boardgame-e40ba",
    storageBucket: "",
    messagingSenderId: "468093515324",
    appId: "1:468093515324:web:98a93b778dcae8e6"
  };
  Firebase.initializeApp(firebaseConfig);
  let DB = Firebase.database();

  export default DB;