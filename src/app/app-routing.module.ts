import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

/* Routing Module */

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'edit-user/:id', component: EdituserComponent},
  { path: 'add-user', component: EdituserComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
