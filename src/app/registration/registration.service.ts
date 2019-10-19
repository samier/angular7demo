import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  public apiurl: string = environment.apiUrl;

  constructor(private http: Http) { }

  signup(data) {
    return this.http.post(this.apiurl + 'register', data).pipe(map((res: Response) => res.json()));
  }
}
