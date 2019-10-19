import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  public api_url: string = environment.apiUrl;

  constructor(private _http: Http) {}

  userlist() {
    const token = localStorage.getItem('token');
    const headers_new = new Headers({ 'Accept': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers_new });
    return this._http.get(this.api_url + 'userList', options).pipe(map((res: Response) => res.json()));
  }
}
