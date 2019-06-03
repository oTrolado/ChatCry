import { Component, OnInit } from '@angular/core';

//import { TypeBarComponent } from '../shared/type-bar/type-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputType:string = 'text';
  newMessage:Object;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('chatCryProfile')){
      //load and jump to main
    } else {

    }
  }

  receivedMessage(event){
    this.newMessage = {
      content: event,
      self: true
    }
  }

}
