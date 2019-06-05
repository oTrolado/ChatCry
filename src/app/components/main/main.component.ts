import { Component, 
          OnInit,  
          AfterViewInit, 
          ViewChild, 
          ElementRef,
          Renderer2 } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  user:Object;
  newMessage:Object;

  @ViewChild('selfAvatar') avatar:ElementRef;


  constructor(
    private render:Renderer2,
    private router:Router
    ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('chatCryProfile'));
  }

  ngAfterViewInit() {
    this.render.setAttribute(this.avatar.nativeElement, 'src', this.user['avatar']);
  }

  receivedMessage(event):void {
    this.sendMessage(event, true);
  }

  sendMessage(message, self):void {
    this.newMessage = {
      content: message,
      self: self,
      url: this.user['avatar'],
      enter: false
    }
  }

  quit():void {
    setTimeout(() => {
      this.user['auth'] = false;
      localStorage.setItem('chatCryProfile', JSON.stringify(this.user));
      this.router.navigate(['']);  
    }, 400);
  }
}
