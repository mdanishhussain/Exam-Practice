import { Component } from '@angular/core';
import { NavController, NavParams, } from 'ionic-angular';
import { ListPage } from '../list/list';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
//import { HTTP } from '@ionic-native/http';
//import { Http } from '@angular/http';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  chat = {email:"", message:""}
  
  chatMessages:Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/messages');
  
  constructor(public db: AngularFireDatabase, public fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

    this.itemRef.on('value', itemSnapshot => {
      this.chatMessages = [];
      itemSnapshot.forEach( itemSnap => {
        this.chatMessages.push(itemSnap.val());
        return false;
      });
    });
    
}

sendMessage(){
  this.chat.email = this.fire.auth.currentUser.email;
  this.db.list('/messages').push(this.chat);
}

}
