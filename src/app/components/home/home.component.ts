import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private userService: UserService, private authService : AuthService) { }

  content : String | undefined;
  isLoggedIn : Boolean = false;
  user : string = '';

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = err.error.message;
        console.log(err.message);
      }
    );
    if (this.authService.getToken()) {
      this.isLoggedIn = true;
      const userString = this.authService.getUser();
      if(userString) {
        this.user = userString.username;
      }
    
    }
  }
  
  
}
