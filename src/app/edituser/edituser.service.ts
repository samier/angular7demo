import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EdituserService {

  public apiurl: string = environment.apiUrl;

  constructor(
    private http: Http,
    private AuthService: AuthService
  ) { }

  saveUser(userId, data) {
    return this.http.put(this.apiurl + 'updateUser/' + userId, data, this.AuthService.getAuthorization()).pipe(map((res: Response) => res.json()));
  }
}
