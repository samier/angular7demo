import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	public api_url: string = environment.apiUrl;

	constructor(private _http: Http) { }

	signin(data) {
		return this._http.post(this.api_url + 'login', data).pipe(map((res: Response) => res.json()));
	}
}
