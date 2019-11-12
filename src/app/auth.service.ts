import { Injectable } from '@angular/core';
import { Headers, RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthorization() {
    return new RequestOptions({ 
      headers: new Headers({ 
        'Accept': 'application/json', 
        'Authorization': localStorage.getItem('token') 
      }) 
    });
  }
}
