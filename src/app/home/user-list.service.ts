import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  public api_url: string = environment.apiUrl;

  constructor(
    private _http: Http,
    private AuthService: AuthService) {}

  userlist() {
    return this._http.get(this.api_url + 'userList', this.AuthService.getAuthorization()).pipe(map((res: Response) => res.json()));
  }

  deleteUserById(userId) {
    return this._http.delete(this.api_url + 'deleteUser/' + userId, this.AuthService.getAuthorization()).pipe(map((res: Response) => res.json()));
  }
}
