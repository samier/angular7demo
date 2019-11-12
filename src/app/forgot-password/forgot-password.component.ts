import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { MyToasterService } from '../../shared/services/global/my-toaster.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ForgotPasswordService: ForgotPasswordService,
    private toaster: MyToasterService
  ) { }

  ngOnInit() {
    this.initForgotPasswordForm();
  }

  initForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.forgotPasswordForm.controls; 
  }

  submitForgotPasswordForm () {
    this.submitted = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.ForgotPasswordService.forgotPassword(this.forgotPasswordForm.value)
    .subscribe(response => {
      if (response.success === true) {
        this.toaster.showToast('Forgot Password', response.message, 'success');
      } else {
        this.toaster.showToast('Forgot Password', response.message, 'error');
      }
    }, error => {
      this.toaster.showToast('Forgot Password', 'Unable to send an email.', 'error');
    });
  }

}
