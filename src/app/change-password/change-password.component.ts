import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';
import { ChangePasswordService } from './change-password.service';
import { MyToasterService } from '../../shared/services/global/my-toaster.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ChangePasswordService: ChangePasswordService,
    private toaster: MyToasterService
  ) { }

  ngOnInit() {
    this.initChangePasswordForm();
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.changePasswordForm.controls; 
  }

  submitChangePasswordForm() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.ChangePasswordService.changePassword(this.changePasswordForm.value)
    .subscribe(response => {
      if (response.success === true) {
        this.toaster.showToast('Change Password', response.message, 'success');
      } else {
        this.toaster.showToast('Change Password', response.message, 'error');
      }
    }, error => {
      this.toaster.showToast('Change Password', 'Unable to change password.', 'error');
    });
  }

}
