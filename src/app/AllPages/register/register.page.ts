import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  email: string;
  password: string;
  dob: any;
  gender: any;
  bio: any;


  id: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,

  ) { }

  ngOnInit() {
  }



  register() {
    if (this.password.length > 5 && this.email != null) {
      this.authService.register(this.email, this.password).then(res => {
        this.registerUser()
      }).catch(err => {
        alert(err)

      })
    } else {
      alert("error")

    }
  }


  registerUser(valueInfo?) {
    var date = new Date();
    var year = date.getFullYear();

    valueInfo = {
      bio: this.bio,
      email: this.email,
      state: 1,
      join_date: date,
      gender: this.gender,
      dob: this.dob
    }
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        console.log("auth=", auth)
        this.id = auth.uid
        this.userService.newUser(valueInfo, this.id);
        this.router.navigate(['/dashboard']);
        // this.router.navigate([`connect-ig/${this.id}`]);
      } else {
      }
    });
  }

  goforLogin() {
    this.router.navigate(['/login']);
  }
}
