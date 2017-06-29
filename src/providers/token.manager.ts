import { Injectable } from "@angular/core";

@Injectable()
export class TokenManager {

userToken = 'userToken';
 cachedToken:any ;

 constructor(  ){}

     setToken(token: any,name:string){
          this.cachedToken = token;
          localStorage.setItem(name,JSON.stringify(token));
      }

      getToken(name:string){
          if(!this.cachedToken){
            //   console.log(localStorage.getItem(name))
              this.cachedToken = JSON.parse(localStorage.getItem(name));
          }
          return this.cachedToken;
      }
    
      removeToken(name:string){
          this.cachedToken = null;
          localStorage.removeItem(name);
      }

}