import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';

import { HeaderComponent } from './header/header.component';
import { CouleurfondDirective } from './couleurfond.directive';

import { DetailarticleComponent } from './detailarticle/detailarticle.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    AccueilComponent,
    HeaderComponent,
    CouleurfondDirective,
    DetailarticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
