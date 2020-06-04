import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg = 'Please login to to access File upload and Userlist..!!';
  errmsg: string = '';
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,) { }

  ngOnInit() {

    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      },
    );
  }

  onLogin() {
    // this.authService.login();
    // this.router.navigate(['registration']);

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Success!', response);
        this.router.navigate(['userlist']);
      },
      // (error) => console.error('Error!', error)

      (error) => {
        console.log('Error!', error.error.message);
        this.errmsg = error.error.message;
        this.router.navigate(['/']);
      }
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  register() {
    this.router.navigate(['registration']);
  }

}
