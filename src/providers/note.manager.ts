import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.manager";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class NoteService {
    public token :any;
        
       
 constructor(private http: Http, private authService :AuthService ) { 



 }




delete(note: any): Promise<any> {
  
       return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.post('https://planstayfit.herokuapp.com/deleteNote',note, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
 
    });
    };
  edit(note: any): Promise<any> {
   return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post('https://planstayfit.herokuapp.com/editNote', JSON.stringify(note), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
       
    };
 add( note:any): Promise<any> {
        
         return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post('https://planstayfit.herokuapp.com/addNote', JSON.stringify(note), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 

    }

    getNotes(email:any): Promise<any> {
       
        // console.log(this.authService.token) 
 return new Promise((resolve, reject) => {
  // console.log(this.authService.token) ;
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);
      
       
      this.http.post('https://planstayfit.herokuapp.com/notes',{email:email}, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
    }
   

}