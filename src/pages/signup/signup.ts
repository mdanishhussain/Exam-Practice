import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  registerDetails = {email:"",password:""};
  note = false;

  constructor(public alertCtrl: AlertController, public fire: AngularFireAuth, public db: AngularFireDatabase ,public navCtrl: NavController, public navParams: NavParams) {
  }


   //GENERAL ALERT FUNCTION
   alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  register(){
    
     if(this.fire.auth.createUserWithEmailAndPassword(this.registerDetails.email, this.registerDetails.password)){
      this.alert("Successfully Registered");
      this.navCtrl.pop();
    }
    else{
      this.alert("Password Does Not Match");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
