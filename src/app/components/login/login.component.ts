import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  inputType:string = 'text';
  newMessage:Object;
  progress:number = 0;
  user:any = {
    name: null,
    email: null,
    password: null,
    avatar: null
  };

  listeningName:boolean = false;
  listeningEmail:boolean = false;
  listeningPassword:boolean = false;
  listeningValidade:boolean = false;

  @ViewChild('prompcontainer') prompContainer:ElementRef;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('chatCryProfile')){
      //load and jump to main
    } else {
      this.sendMessage('Bem vindo ao ChatCry!!!<br/> Muitas conversas emocionantes te aguardam, mas primeiro precisamos tomar os passos inicias certo?', false);
      setTimeout(() => this.sendMessage('Digite "recomeçar" para iniciar de novo, ok?', false), 500);
      setTimeout(() => this.getUserName(), 1000);
    }
  }

  ngAfterViewInit() {
    
  }

  validEmail(email:string):boolean {
    if (!/@/g.test(email)) return false;
    return true;
  }

  sendMessage(message:string, self:boolean):void {
    if(this.inputType == 'password') message = '*'.repeat(message.length);
    
    this.newMessage = {
      content: message,
      self: self,
      url: 'assets/bot.png'
    }
  }

  receivedMessage(event:string): void {
    
    this.sendMessage(event,true);

    if(event == 'recomeçar' || event == '"recomeçar"') return this.restart();

    if(this.listeningName){
      this.user.name = event;
      this.listeningName = false;
      setTimeout(() => this.getUserEmail(), 1000);
    }
    else if(this.listeningEmail) {
      if(this.validEmail(event)) {
      
        this.user.email = event.toLowerCase;
        this.listeningEmail = false;
        setTimeout(() => this.getUserPassword(), 1000);

      }
      else 
        setTimeout (() => this.sendMessage('Desculpe eu não posso usar isto como email :/ Tente denovo', false), 1000);
    }
    else if(this.listeningPassword){

      this.user.password = event;
      this.listeningPassword = false;
      this.inputType = 'text';
      setTimeout(() => this.validadePassword(), 1000);

    }
    else if(this.listeningValidade) {
      this.inputType = 'text';

      if(event == this.user.password) {
        this.listeningValidade = false;
        setTimeout(() => this.getUserImage(), 1000);
      }
      else {
        setTimeout (() => {
          this.sendMessage('As senhas não bateram ♪ "Teeeeente outra veeeez" ♫', false)
          this.inputType = 'password';
        }, 1000);
      }
    }
  }

  getUserName():void {
    this.sendMessage('Vou te ajudar com isso, por hora preciso que você me diga qual o seu nome completo ;)', false);
    this.listeningName = true;
  }

  getUserEmail():void {
    this.sendMessage('Seja bem vindo(a) '+ this.user.name +', gostaria de saber seu e-mail por favor...', false);
    this.listeningEmail = true;
  }


  getUserPassword():void {
    this.sendMessage('Muito bem! Estamos quase acabando, pode digitar uma senha legal?', false);
    this.listeningPassword = true;
    this.inputType = 'password';
  }

  validadePassword():void {
    this.sendMessage('Ótimo, só repita sua senha para confirmar :)', false);
    this.listeningValidade = true;
    this.inputType = 'password';
  }

  getUserImage():void {
    this.sendMessage('Para finalizar vou te pedir uma foto, sorria! :)', false);
    setTimeout(() => this.prompContainer.nativeElement.style.display  = 'block', 3000);
  }

  restart():void {
    this.user = { name: null, email: null, password: null, avatar: null };
    this.listeningEmail = false;
    this.listeningName = false;
    this.listeningPassword = false;
    this.listeningValidade = false;
    this.inputType = 'text';

    setTimeout(() => {
      this.sendMessage('"O insucesso é apenas uma oportunidade para recomeçar com mais inteligência." - Henry Ford', false);
      this.prompContainer.nativeElement.style.display = 'none';
      setTimeout(() => this.getUserName(), 1000);
    },400)
    
  }
}
