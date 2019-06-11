import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TypeBarComponent } from './components/shared/type-bar/type-bar.component';

import { RippleDirective } from './components/shared/ripple/ripple.directive';
import { TalkComponent } from './components/shared/talk/talk.component';
import { MainComponent } from './components/main/main.component';
import { TabsComponent } from './components/shared/tabs/tabs.component';
import { FilterContactsPipe } from './components/shared/pipes/filter-contacts.pipe';
import { ChatsComponent } from './components/shared/tabs/chats/chats.component';
import { UrlPipePipe } from './components/shared/pipes/url-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TypeBarComponent,
    RippleDirective,
    TalkComponent,
    MainComponent,
    TabsComponent,
    FilterContactsPipe,
    ChatsComponent,
    UrlPipePipe
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
