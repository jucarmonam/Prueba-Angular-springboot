import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterManagerComponent } from './register-manager/register-manager.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, RegisterManagerComponent, RegisterFormComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
