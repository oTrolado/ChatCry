import { Component, OnInit } from '@angular/core';

//import { TypeBarComponent } from '../shared/type-bar/type-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputType:string = 'text';

  constructor() { }

  ngOnInit() {
  }

  receivedMessage(event){
    console.log(event);
  }

}
