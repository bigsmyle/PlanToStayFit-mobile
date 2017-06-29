import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { AuthService } from "../../providers/auth.manager";
import { TokenManager } from "../../providers/token.manager";


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {
  userNow:any;
theForm: FormGroup;
public home;
public pagereg;
loading: any;

  constructor(public navCtrl: NavController,  public loadingCtrl: LoadingController ,public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService,private  authToken :TokenManager) {
    this.home= HomePage;
    this.pagereg=RegisterPage;

 this.theForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });  
// this.authToken.removeToken();
// this.authService.logout();

}


  ionViewDidLoad() {
      this.showLoader();
 
        this.authService.checkAuthentication().then((res:any) => {
            console.log("Already authorized");
            if (res!='Wrong email/password') {
              this.loading.dismiss();   
            this.navCtrl.setRoot(HomePage);
            }
            
        }, (err) => {
            console.log("Not already authorized");
             this.loading.dismiss();
        });
 
  }
onSubmit() {
this.showLoader();

let credentials = this.theForm.value;
 
        this.authService.login(credentials).then((result:any) => {
          if (result!='Wrong email/password') {
             this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);}
        }, (err) => {
          this.loading.dismiss();
            console.log(err);
        });

// 
  }
   showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }

  register(){
      
       this.navCtrl.push(this.pagereg);
    }
    

}
