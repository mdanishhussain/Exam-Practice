import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, } from 'ionic-angular';
import { ListPage } from '../list/list';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  clickedImage: any;
  
  med = {name:"", qty:"", date:"", time:"", img:""};
  //chat = {email:"", message:""}
  
  //chatMessages:Array<any> = [];
  //public itemRef: firebase.database.Reference = firebase.database().ref('/messages');
  
  constructor(public platform: Platform, public localNotifications: LocalNotifications, public alertCtrl: AlertController, private camera: Camera, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
        
}

//GENERAL ALERT FUNCTION
alert(message: string){
  this.alertCtrl.create({
    title: 'Info',
    subTitle: message,
    buttons: ['OK']
  }).present();
}

addMedicine(){
  try{
    this.db.list('/medicines').push(this.med);

    var date = new Date(this.med.date+" "+this.med.time);
  console.log(date);
  this.localNotifications.schedule({
     text: this.med.name,
     trigger: {at: date},
     led: 'FF0000',
     sound: null,
  });
  this.alert("Added Successfully");

  }
  catch(error){
    this.alert(error);
  }
}


openCamera(){
  this.camera.getPicture(this.options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.med.img = 'data:image/jpeg;base64,' + imageData;
   }, (err) => {
    this.alert("Camera Not Found");
   });
}



// sendMessage(){
//   this.chat.email = this.fire.auth.currentUser.email;
//   this.db.list('/messages').push(this.chat);
// }

}
