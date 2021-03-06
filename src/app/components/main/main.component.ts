import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';

import { ContactsService } from '../../services/contacts.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  user: Object;
  newMessage: Object;
  
  contactList: any = [];
  groupList: any = [];
  
  newChat: Array<any> = [];
  lastTalk: any = { nome: '' };

  @ViewChild('selfAvatar') avatar: ElementRef;

  hideMenu = false;

  constructor(
    private render: Renderer2,
    private router: Router,
    private contacts: ContactsService,
    private groupS: GroupService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('chatCryProfile')) {
      this.user = JSON.parse(localStorage.getItem('chatCryProfile'));
    } else {
      this.router.navigate(['']);
    }
    this.fetchData();
    setInterval(() => this.fetchData(), 60000);
  }

  fetchData() {
    this.contacts.getContacts()
      .subscribe(
        res => {
          const sorted: any = res;
          this.contactList = sorted.sort((a, b) => (a.nome > b.nome) ? 1 : (a.nome < b.nome) ? -1 : 0);
        },
        error => alert('Não foi possivel conectar ao servidor :´(')
      );

    this.groupS.getGroups()
      .subscribe(
        res => {
          const sorted: any = res;
          this.groupList = sorted.sort((a, b) => (a.nome > b.nome) ? 1 : (a.nome < b.nome) ? -1 : 0);
        },
        error => console.error(error)
      );
  }

  ngAfterViewInit() {
    this.render.setAttribute(this.avatar.nativeElement, 'src', this.user['avatar']);
  }

  receivedMessage(event): void {
    this.sendMessage(event, true);
  }

  sendMessage(message, self): void {

    this.newMessage = {
      content: message,
      self,
      url: this.user['avatar'],
      enter: false
    };

    setTimeout(() => {
      localStorage.setItem(
        'chatCry' + this.lastTalk.nome,
        JSON.stringify({ talk: this.newChat })
      );
    }, 100);
  }

  quit(): void {
    this.startChat();
    setTimeout(() => {
      this.user['auth'] = false;
      localStorage.setItem('chatCryProfile', JSON.stringify(this.user));
      this.router.navigate(['']);
    }, 400);
  }

  menuToggle(event) {
    this.hideMenu = event;
  }

  resize(): void {
    if (window.innerWidth > 800) {
      this.menuToggle(false);
    }
  }

  startChat(contact?: any): any {
    if (!!contact)
      if (contact.nome === this.lastTalk.nome) return 'Same Name';

    if (this.newChat.length > 0)
      localStorage.setItem(
        'chatCry' + this.lastTalk.nome,
        JSON.stringify({ talk: this.newChat })
      );

    this.newChat = [];
    if (!!contact)
      return this.chatWith(contact);
  }

  chatWith(contact): any {
    let talk: Array<any> = [];

    if (localStorage.getItem('chatCry' + contact.nome))
      talk = JSON.parse(localStorage.getItem('chatCry' + contact.nome)).talk;

      let check = true;
      let lastMessageContact = Array.from(talk);
      lastMessageContact = lastMessageContact.reverse().filter(message => {
        if (check && !message.self) {
          check = false;
          return message;
        }
      });

      let message = {
        content: contact.mensagem,
        self: false,
        url: contact.imagem,
        enter: false
      }

    if (!!contact.mensagem) 
      if (lastMessageContact[0]) {
        if (lastMessageContact[0].content !== contact.mensagem)
          talk.push(message);
      }
      else
        talk.push(message);
    
    else if(!!contact.ultimaMensagem) {
      if(contact.ultimaMensagem.mensagem) {
        message.content = contact.ultimaMensagem.mensagem;
        message.url = contact.ultimaMensagem.imagem;

        if (lastMessageContact[0]) {
          if (lastMessageContact[0].content !== contact.ultimaMensagem.mensagem)
            talk.push(message);
        }
        else
          talk.push(message);
      }
    }

    this.lastTalk = contact;

    return this.newChat = talk
  }
}
