import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';



import { AgmCoreModule } from '@agm/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { MapDirective } from '../pages/map/map.directive';
import { LoginPage } from '../pages/login/login';
import { NotePage } from '../pages/note/note';
import { RegisterPage } from '../pages/register/register';
import { AuthService } from '../providers/auth.manager';
import { TokenManager } from '../providers/token.manager';
import { NoteService } from '../providers/note.manager';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NotePage,
    RegisterPage,
    MapPage,
    MapDirective
    
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCH8TaxKqTOP2ol0q7JJdZjEgmPTEvGrus',libraries: ['places']}),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    NotePage,
    MapPage
  ],
  providers: [
   
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    TokenManager,
    NoteService

  ]
})
export class AppModule {}
