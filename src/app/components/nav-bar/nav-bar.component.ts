import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  content : string | null = '';
  isLoggedIn : boolean = false;

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.content = this.authService.getToken();
    if (this.content) {
      this.isLoggedIn = true;
    }
  }

}
