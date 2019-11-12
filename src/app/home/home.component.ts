import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from './user-list.service';
import { MyToasterService } from '../../shared/services/global/my-toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userList: any;
  success = false;
  failed = false;
  totalUser: any;
  message: any;
  router: any;

  constructor(
    private userlistservice: UserListService,
    private _router: Router,
    private toaster: MyToasterService
  ) {
    this.router = _router;
   }

  ngOnInit() {
    console.log(this.router);
    if (!localStorage.getItem('token')) {
      this._router.navigate(['/']);
    }
    this.getUserList();
  }

  getUserList() {
    this.userlistservice.userlist().subscribe(resultArray => {
      const result = resultArray;
      if (result.status === 'success') {
        if (result.data.length > 0) {
          this.userList = result.data;
          this.totalUser = this.userList.length;
          this.success = true;
        } else {
          this.message = 'User not found';
          this.failed = true;
        }
      } else {
        this.toaster.showToast('List', result.message, 'error');
      }
    });
  }

  deleteUserById(userId) {
    this.userlistservice.deleteUserById(userId).subscribe(resultArray => {
      const result = resultArray;
      if (result.status === 'success') {
        this.toaster.showToast('Deleted', result.message, 'success');
        this.getUserList();
      } else {
        this.toaster.showToast('Deleted', result.message, 'error');
      }
    });
  }

}
