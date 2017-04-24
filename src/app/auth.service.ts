import { Injectable } from '@angular/core';
import { IUser } from './user';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
    // private _loginUrl = '/api/login';
    // private _loginUrl = 'https://esqo4jzb76.execute-api.us-east-1.amazonaws.com/dev/login';
    private _loginUrl = 'http://localhost:8080/api/authenticate';
    public currentUser: IUser;


    constructor(private http: Http) {}

    loginUser(userName: string, password: string) {
      const headers = new Headers({ 'Content-Type': 'application/json'});
      const options = new RequestOptions({headers: headers});
      const loginInfo = { name: userName, password: password };

      return this.http.post(this._loginUrl, JSON.stringify(loginInfo), options)
      .do(resp => {
        if (resp) {
          let responseData: any = resp.json();
          if (responseData.success === true) {
            this.currentUser = responseData;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          }
        }
      }).catch(error => {
        return Observable.of(false);
      });
    }

    isAuthenticated() {
      return !!this.currentUser;
    }

    checkAuthenticationStatus() {
      return this.http.get('/api/currentIdentity').map((response: any) => {
        if (response._body) {
          return response.json();
        } else {
          return {};
        }
      })
      .do(currentUser => {
        if (!!currentUser.userName) {
          this.currentUser = currentUser;
        }
      })
      .subscribe();
    }

    getUser() {
      console.log('getUser this.currentUser', this.currentUser);
      return this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
      // this.currentUser.firstName = firstName;
      // this.currentUser.lastName = lastName;

      const headers = new Headers({ 'Content-Type': 'application/json'});
      const options = new RequestOptions({headers: headers});

      // return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
    }

    logout() {
      this.currentUser = undefined;
      localStorage.clear();

      const headers = new Headers({ 'Content-Type': 'application/json'});
      const options = new RequestOptions({headers: headers});

      return this.http.post('/api/logout', JSON.stringify({}), options);
    }
}
