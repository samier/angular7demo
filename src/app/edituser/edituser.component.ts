import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EdituserService } from './edituser.service';
import { MyToasterService } from '../../shared/services/global/my-toaster.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  editUserForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private edituserService: EdituserService,
    private toaster: MyToasterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initEditUserForm();
  }

  initEditUserForm() {
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      birthdate: ['', Validators.required],
      language: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.editUserForm.controls; 
  }

  submitEditUserForm() {
    this.submitted = true;
    if (this.editUserForm.invalid) {
      return;
    }
    let userId;
    this.route.params.subscribe( params => userId = params.id);
    this.edituserService.saveUser(userId, this.editUserForm.value)
    .subscribe(response => {
      if (response.success === true) {
        this.toaster.showToast('Update User', response.message, 'success');
      } else {
        this.toaster.showToast('Update User', response.message, 'error');
      }
    }, error => {
      this.toaster.showToast('Update User', 'Unable to update user.', 'error');
    });
  }
  

}
