import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenManager } from '../../providers/token.manager';
import { AuthService } from '../../providers/auth.manager';
import { HomePage } from "../home/home";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthService, TokenManager]
})
export class RegisterPage {
  public theForm: FormGroup;
  public home: any;
  public loading: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService, private authToken: TokenManager) {
    this.home = HomePage
    this.theForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

  }
  onSubmit() {
    this.showLoader();
    this.authService.register(this.theForm.value).then((result) => {

      let eu: any = result;
      if (eu != "Username/Email already exists") {
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }

    }, (err) => {
      this.loading.dismiss();
      console.error(err);
    });
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
  }
}
