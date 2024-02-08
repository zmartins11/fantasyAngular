import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SpinnerInterceptor } from 'src/_helpers/SpinnerInterceptor';
import { AuthInterceptor } from 'src/_helpers/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RaceDetailsComponent } from './components/race-details/race-details.component';
import { AngularTwitterTimelineModule } from 'angular-twitter-timeline';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { RacePopupComponent } from './components/race-popup/race-popup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherForecastPopupComponent } from './components/weather-forecast-popup/weather-forecast-popup.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    NavBarComponent,
    SpinnerComponent,
    CalendarComponent,
    RaceDetailsComponent,
    RacePopupComponent,
    WeatherComponent,
    WeatherForecastPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AngularTwitterTimelineModule,
    YouTubePlayerModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide : HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
