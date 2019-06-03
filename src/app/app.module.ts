import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TypeBarComponent } from './components/shared/type-bar/type-bar.component';

import { RippleDirective } from './components/shared/ripple/ripple.directive';
import { TalkComponent } from './components/shared/talk/talk.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TypeBarComponent,
    RippleDirective,
    TalkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
