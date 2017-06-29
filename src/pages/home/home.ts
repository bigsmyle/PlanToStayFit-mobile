import { Component,  trigger, state, style, transition, animate } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TokenManager } from '../../providers/token.manager';
import { LoginPage } from "../login/login";
import { AuthService } from "../../providers/auth.manager";
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
})
export class HomePage {
  flip: string = 'inactive';
  duration:any="0";
  min:any;
  hours:any;
  distance:any=0;
  calories:any=0;
  private login ;

  constructor(public navCtrl: NavController, private authService: AuthService, public navParams: NavParams, private  authToken :TokenManager) {
  this.login=LoginPage;
 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
returnBack( ){

this.authToken.removeToken("token");
this.navCtrl.push(this.login);

    }
    
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
  handleData($event:any){
this.distance=$event.distance;
this.duration=$event.time;
this.calories=$event.calories;

  }
    ionViewCanEnter(): boolean{
  
   if (this.authToken.getToken("token")) {
        console.log('ionViewDidLoad intra');
            return true;
           
        }else{
  console.log('ionViewDidLoad pa login');
        this.navCtrl.push(this.login);
        return false;

        }

  }
//    
}
