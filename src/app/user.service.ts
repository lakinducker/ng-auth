import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

import { IUser } from './user';

@Injectable()
export class UserService {

  private _userUrl = 'http://localhost:8080/api/users';

  constructor(private _http: Http,
              private _auth: AuthService) {}

  getUsers(): Observable<IUser[]> {
      console.log('Getting users now.');
      // const headers = new Headers();
      // headers.append('Access-Control-Allow-Headers', 'Content-Type');
      // headers.append('Access-Control-Allow-Methods', 'GET');
      // headers.append('Access-Control-Allow-Origin', '*');
      return this._http.get(this._userUrl, this.jwt())
          .map((response: Response) => <IUser[]> response.json())
          .do(data => console.log('All: ' +  JSON.stringify(data)))
          .catch(this.handleError);
  }

  // getUser(id: string): Observable<IUser> {
  //           return this._http.get(this._userUrl + '/' + id)
  //               .map((response: Response) => <IUser> response.json())
  //               .do(data => console.log('User: ' +  JSON.stringify(data)))
  //               .catch(this.handleError);
  // }

  // postUser(user: IUser): Observable<any> {
  //           const body = JSON.stringify(user);
  //           const headers = new Headers({ 'Content-Type': 'application/json' });
  //           const options = new RequestOptions({ headers: headers });

  //           return this._http.post(this._userUrl, body, options)
  //                               .map(this.extractData)
  //                               .catch(this.handleError);
  // }

  // putUser(user: IUser): Observable<any> {
  //           const body = JSON.stringify(user);
  //           const headers = new Headers({ 'Content-Type': 'application/json' });
  //           const options = new RequestOptions({ headers: headers });

  //           return this._http.put(this._userUrl + '/' + user.id, body, options)
  //                               .map(this.extractData)
  //                               .catch(this.handleError);
  // }


  // Private Methods

  private extractData(res: Response) {
        const body = res.json();
        return body.fields || { };
  }

  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }

  private jwt() {
      // create authorization header with jwt token
      let currentUser = this._auth.getUser();
      if (currentUser && currentUser.token) {
          // let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          let headers = new Headers({ 'x-access-token': currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }


}
