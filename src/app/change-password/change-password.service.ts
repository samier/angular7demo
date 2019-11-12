import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  public apiurl: string = environment.apiUrl;

  constructor(
    private http: Http,
    private AuthService: AuthService
    ) { }

  changePassword(data) {
    return this.http.post(this.apiurl + 'changepassword', data, this.AuthService.getAuthorization()).pipe(map((res: Response) => res.json()));
  }
}
