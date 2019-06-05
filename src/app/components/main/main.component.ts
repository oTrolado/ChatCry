import { Component, 
          OnInit,  
          AfterViewInit, 
          ViewChild, 
          ElementRef,
          Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  user:Object;

  @ViewChild('selfAvatar') avatar:ElementRef;


  constructor(private render:Renderer2) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('chatCryProfile'));
  }

  ngAfterViewInit() {
    this.render.setAttribute(this.avatar.nativeElement, 'src', this.user['avatar']);
  }

  receivedMessage(event):void {
    console.log(event);
  }
}
