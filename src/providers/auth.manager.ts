import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import { TokenManager } from './token.manager';


@Injectable()
export class AuthService {
    email: any;
    password: any;
    public token: any;

    constructor(private http: Http, public storage: Storage, private authToken: TokenManager) {
        
    }


    getPlaces(origin: any): Observable<any> {

        var latitude = origin.latitude;
        var longitude = origin.longitude;
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyC-rvT4Mr-bzPCgnr4fSAY74y6THmEvDnQ',
        )
            .map((response: Response) => <any>response.json())

            .catch(this.handleError);
    };





    checkAuthentication() {

        return new Promise((resolve, reject) => {


            this.token =this.authToken.getToken("token").token          
            // this.storage.get('token').then((value:any) => {

            //     this.token = value;
                // console.log(this.token);
                let headers = new Headers();
                headers.append('Authorization', this.token);

                this.http.get('https://planstayfit.herokuapp.com/protected', { headers: headers })
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });

            });

        // });

    }

    register(details) {



        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://planstayfit.herokuapp.com/register', details, { headers: headers })
                .subscribe((res: any) => {

                    if (res != "Username/Email already exists") {
                        let data = res.json();
                        this.token = data.token;
                        
                        console.log(this.token);
                        this.authToken.setToken(data,"token");
                       
                        resolve(data);
                    }

                }, (err) => {
                    reject(err);
                });

        });

    }

    login(credentials) {

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post('https://planstayfit.herokuapp.com/login', { email: credentials.username, password: credentials.password }, { headers: headers })
                .subscribe(res => {

                    let data = res.json();
                    this.token = data.token;
                     this.authToken.setToken(data,"token");
                    
                    resolve(data);

                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        });

    }

    logout() {
         this.authToken.removeToken("token");
    }





    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
    // C:\Users\Sasha\AppData\Local\Android\sdk
    // C:\Users\Sasha\AppData\Local\Android\sdk\build-tools\25.0.3\zipalign
}