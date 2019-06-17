import { 
  Component, 
  OnInit, 
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2 
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
  @Output() delete: EventEmitter<string> = new EventEmitter();

  @ViewChild('more') more: ElementRef;

  constructor(private render: Renderer2) { }

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

  rotateMore(icon:any, value:number): void {
    this.render.setStyle(
      icon,
      'transform',
      'rotate('+value+'deg)'
    );
  }

  toggleMenu(menu, more?): void {
    let display = 'flex';
    if(menu.style.display === 'flex')
      display = 'none';
    setTimeout(() => {
      this.render.setStyle(
        menu,
        'display',
        display
      ); 
      if(more)
        this.rotateMore(more, 0);
    }, 400);
  }

  remove(obj:any): void {
    this.delete.emit(obj.nome);
  }

}
