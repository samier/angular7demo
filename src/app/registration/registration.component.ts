import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  pages: string = 'Registration';
  signUpForm: FormGroup;
  submitted = false;
  message: any;
  success = false;
  failed = false;
  router: any;
  userName: any;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private SignupService: RegistrationService,
    ) {
      this.router = _router;
    }

  ngOnInit() {
    this.selectedSignup();
  }

  selectedSignup() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      language: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      role_name: ['SuperAdmin', Validators.required],
    });
  }

  signupFormSubmit() {
    console.log('Function called');
    if (this.signUpForm.valid) {
      console.log('Function valid');
      this.submitted = true;
      const signupDatavalue = this.signUpForm.value;
      this.SignupService.signup(signupDatavalue).subscribe(resultArray => {
        console.log('Function API called');
        const result = resultArray;
        if (result.success === true) {
          localStorage.setItem('token', 'Bearer ' + result.data.token);
          localStorage.setItem('userName', result.data.name);
          this.success = true;
          this.failed = false;
          this.message = result.message;
          console.log('Signup Result', result);
          this._router.navigate(['/home']);
        } else {
          this.failed = true;
          console.log('Failed Message==>', result.message);
        }
      }, error => {
        this.failed = true;
        this.message = 'Please complete all required field.';
        console.log('Main Faild Message ==>', this.message);
      });
    } else {
      this.failed = true;
      this.message = 'Please Insert all field details.';
      console.log('Main not valid message==>', this.message);
    }
  }

}
