import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [DatePipe]
})
export class ListPage {

  selectedItem: any;
  icons: string[];
  items: Array<{title: string,  note: string, icon: string}>;

  medDetails:Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/medicines');

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    

    this.itemRef.on('value', itemSnapshot => {
      this.medDetails = [];
      itemSnapshot.forEach( itemSnap => {
        this.medDetails.push(itemSnap.val());
        return false;
      });
    });

  }

  //GENERAL ALERT FUNCTION
  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  getNotifications(){
    
  }



}




