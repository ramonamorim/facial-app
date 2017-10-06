import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8880/';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  /** storeUserCredentials(token) {
        window.localStorage.setItem('raja', token);
        this.useCredentials(token);
        
    }


  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //baisc auth
        headers.append('Content-Type', 'application/json');        

        this.http.post(apiUrl+'login', credentials, {headers: headers})
          .subscribe(res => {
                if(res.json().success){
                    this.storeUserCredentials(res.json().token);
                    resolve(true);
                }
                else
                    resolve(false);
            });
    });
  } 

  **/

  authSuccess(token) {
    this.error = null;
    this.storage.set('token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    this.storage.set('profile', this.user);
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


      this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => this.authSuccess(data.id_token),
        err => this.error = err
      );

        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
        .map(res => res.json())
          .subscribe(
            res => {
            resolve(data.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');



        this.http.post(apiUrl+'guest/signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));

        this.http.post(apiUrl+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }

}