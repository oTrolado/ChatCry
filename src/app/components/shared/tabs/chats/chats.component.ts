import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  
  @Input() filter: string;
  @Input() chatList: Array<any> = null;
  @Input() activeChat: string;
  @Output() toggleInfo: EventEmitter<any> = new EventEmitter();
  @Output() toggleGroupInfo: EventEmitter<any> = new EventEmitter();
  @Output() chat: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitInfo(contact, event?: Event): any {
    
    
    if(!!event) 
      event.stopImmediatePropagation();
    if(!!contact.ultimaMensagem){
      contact = JSON.parse(JSON.stringify(contact));
      contact.ultimoAcesso = contact.ultimaMensagem;
      this.toggleGroupInfo.emit(contact);
      return 'Its a group!'; 
    }
    this.toggleInfo.emit(contact);
    return contact; 
  }
  
  startChat(contact) {
    this.chat.emit(contact);
    return contact;
  }
}
