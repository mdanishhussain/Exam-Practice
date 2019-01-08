import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  registerDetails = {email:"",password:"", repassword:""};
  note = false;

  constructor(public alertCtrl: AlertController, public fire: AngularFireAuth, public db: AngularFireDatabase ,public navCtrl: NavController, public navParams: NavParams) {
  }

  validatepassword(){
    if(this.registerDetails.password==this.registerDetails.repassword){
      this.note=true;
    }
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
      this.navCtrl.push(LoginPage);
    }
    else{
      this.alert("Some Problem Occured");
    }
  }

  goLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
