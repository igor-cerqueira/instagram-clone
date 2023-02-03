import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
// import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'instagram-clone';

  ngOnInit() {

    var config = {
      apiKey: "AIzaSyDgAkoq65h-v6JvdFHR5pYFIbnTJMxMEPA",
      authDomain: "jta-instagram-clone-d528b.firebaseapp.com",
      projectId: "jta-instagram-clone-d528b",
      storageBucket: "jta-instagram-clone-d528b.appspot.com",
      messagingSenderId: "548936992446",
      appId: "1:548936992446:web:f8fc4f211360a2acd140ef",
      measurementId: "G-77B3004TTE",
      databaseURL: "https://jta-instagram-clone-d528b-default-rtdb.firebaseio.com"
    };

    // Initialize Firebase

    firebase.initializeApp(config)

  }
}
