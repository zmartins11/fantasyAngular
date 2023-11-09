import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = 'null';
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      const userString = this.authService.getUser();
    }

}

onSubmit(): void {
  const { username, password } = this.form;
  this.authService.login(username, password).subscribe(
    data => {
      const user = new User(data.username, data.accessToken, data.role);
      this.authService.saveToken(data.accessToken);
      this.authService.saveUser(user);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = data.role; 
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  );
}

reloadPage(): void {
  window.location.reload();
}

}
