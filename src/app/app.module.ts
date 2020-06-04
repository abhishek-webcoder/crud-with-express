import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewsComponent } from './news/news.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { RegistrationService } from './registration.service';
import { NewsService } from './news/news.service';

@NgModule({
  declarations: [
    AppComponent,
    FileuploadComponent,
    RegistrationComponent,
    LoginComponent,
    PageNotFoundComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    RegistrationService,
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
