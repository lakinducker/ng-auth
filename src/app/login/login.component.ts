import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { pageTransition } from '../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ pageTransition ]
})
export class LoginComponent implements OnInit {
  state: string = 'in';
  loginInvalid = false;
  userName = '';
  password = '';
  mouseoverLogin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.state = (this.state === 'in' ? 'out' : 'in');
  }

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password).subscribe(resp => {
      if (!resp) {
        this.loginInvalid = true;
      } else {
        this.router.navigate(['user-list']);
      }
    });
  }

  cancel() {
    this.router.navigate(['home']);
  }

}
