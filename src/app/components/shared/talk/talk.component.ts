import { Component,
          OnInit,
          Input,
          OnChanges,
          ViewChild,
          ElementRef,
          Output,
          EventEmitter} from '@angular/core';


@Component({
  selector: 'talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})


export class TalkComponent implements OnInit, OnChanges {

  previus = true;
  lastMessage: any = {};

  @Input() message: any;
  @Input() messages: Array<Object> = [];
  @Output() loginEvent: EventEmitter<boolean> = new EventEmitter;
  @ViewChild('container') container: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!!this.message) 
      if(this.message != this.lastMessage) {
        this.messages.push(this.message);
        this.lastMessage = this.message;
      }
        
    setTimeout(() => {
      this.container.nativeElement.scrollTop =
      this.container.nativeElement.scrollHeight;
    }, 10);
  }

  avatar(i): boolean {
    if (!this.messages[i]['self']) {

      if (!!this.messages[i - 1]) {
        if (this.messages[i - 1]['self'] != this.messages[i]['self']) { return true; }
      } else { return true; }
    }
    return false;
  }

  login(): void {
    if (localStorage.getItem('chatCryProfile')) {
      this.loginEvent.emit(true);
    }
  }
}
