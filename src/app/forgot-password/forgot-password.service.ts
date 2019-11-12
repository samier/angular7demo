import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  public apiurl: string = environment.apiUrl;

  constructor(
    private http: Http
  ) { }

  forgotPassword(data) {
    return this.http.post(this.apiurl + 'forgotpassword', data).pipe(map((res: Response) => res.json()));
  }
}
