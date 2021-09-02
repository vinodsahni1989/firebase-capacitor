import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any





  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }


  logIn() {
    if (this.password.length > 5 && this.email != null) {
      this.authService.login(this.email, this.password).then(res => {
        console.log("login res=  ", res)
        this.authService.userEmail = res['user'].email
        console.log("user email= ", this.authService.userEmail)
        this.router.navigate(['/dashboard']);
        this.email = ''
        this.password = ''
      }).catch(err => {
        alert('Sorry we could not log you in, please check your email and password')
      })
    } else {

    }
  }

  gotoSignUp() {
    this.router.navigate(['/register']);
  }
}
