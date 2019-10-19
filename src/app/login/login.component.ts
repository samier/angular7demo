import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
	pages: string = 'Login';
	signInForm: FormGroup;
	submitted = false;
	message: any;
	success = false;
	failed = false;
	router: any;

	constructor(
		private formBuilder: FormBuilder,
		private _router: Router,
		private SigninService: LoginService,
	) {
		this.router = _router;
	}

	ngOnInit() {
		this.selectedSignin();
		if (localStorage.getItem('token')) {
			this._router.navigate(['/home']);
		}
	}

	selectedSignin() {
		this.signInForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	signinFormSubmit() {
		if (this.signInForm.valid) {
			this.submitted = true;
			const signinDatavalue = this.signInForm.value;
			this.SigninService.signin(signinDatavalue).subscribe(resultArray => {
				const result = resultArray;
				if (result.success === true) {
					localStorage.setItem('token', 'Bearer ' + result.data);
					this.success = true;
					this.failed = false;
					this.message = result.message;
					this._router.navigate(['/home']);
				} else {
					this.failed = true;
					console.log('Failed Message==>', result.message);
				}
			}, error => {
				this.failed = true;
				this.message = 'Please Insert valid Email or Password';
				console.log('Main Faild Message==>', this.message);
			});
		} else {
			this.failed = true;
			this.message = 'Please Insert valid Email or Password';
			console.log('Main not valid message==>', this.message);
		}
	}
}
