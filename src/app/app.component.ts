import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { User } from './model/user';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { DateTimeServiceService } from './_services/date-time-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'fantasyAngular';
  private roles: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string = '';
  user: User | null | undefined;
  isPageLoaded = false;
  isPageScrolledToBottom = false;
  showPropertyName: boolean = true;

  constructor(private authService: AuthService, private router: Router,
    private dateTimeService: DateTimeServiceService,
    private el: ElementRef, private renderer: Renderer2) { }


    @HostListener('window:scroll', [])
    onScroll(): void {
      this.updatePropertyNameVisibility();
    }

    ngAfterViewInit(): void {
      // Initial check when the component is first initialized
      this.updatePropertyNameVisibility();
    } 

    private updatePropertyNameVisibility(): void {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      const documentHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0,
        document.documentElement.clientHeight || 0
      );
  
      // Check if the user is at the bottom or top of the page
      const isAtBottom = scrollPosition + windowHeight >= documentHeight;
      const isAtTop = scrollPosition === 0;
  
      // Update the visibility of the property name based on the scroll position
      this.showPropertyName = isAtBottom || isAtTop;
    }



  checkPageLoaded() {
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.offsetHeight;

    this.isPageScrolledToBottom = scrollPosition + windowHeight >= documentHeight;

    if (this.isPageScrolledToBottom) {
      this.isPageLoaded = true;
      console.log("pagina" + this.isPageLoaded);
    }
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn);
      this.roles = this.user.role;
      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    }
  }

  logout(): void {
    this.authService.signOut();
    window.location.reload();
  }

  checkLogin(): boolean {
    if (this.authService.getToken()) {
      return true;
    } else {
      return false;
    };
  }

  getUsername(): String {
    this.user = this.authService.getUser();
    if (this.user != null) {
      return this.username = this.user.username;
    }
    return '';
  }


}
