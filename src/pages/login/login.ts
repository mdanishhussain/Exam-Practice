import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListPage } from '../list/list';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loginDetails = {email:"",password:""};
  constructor(public db: AngularFireDatabase, public alertCtrl: AlertController, public fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }



    //GENERAL ALERT FUNCTION
    alert(message: string){
      this.alertCtrl.create({
        title: 'Info',
        subTitle: message,
        buttons: ['OK']
      }).present();
    }


    //LOGIN FUNCTION
  login(){
    try{
      if(this.fire.auth.signInWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password)){
        this.alert("Welcome");
        this.navCtrl.setRoot(HomePage, this.fire.auth.currentUser.email);
      }
    }
    catch(error){
      this.alert("Invalid Details");
    }
  }
  
  signup(){
    this.navCtrl.push(SignupPage);
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
