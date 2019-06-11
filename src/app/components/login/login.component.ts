import { Component,
          OnInit,
          ElementRef,
          ViewChild,
          Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputType = 'text';
  newMessage: Object;
  progress = 0;
  user: any = {
    name: null,
    email: null,
    password: null,
    avatar: null,
    auth: false
  };

  listeningName = false;
  listeningEmail = false;
  listeningPassword = false;
  listeningValidade = false;
  listeningLogin = false;

  @ViewChild('prompcontainer') prompContainer: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('avatar') avatar: ElementRef;

  constructor(
    private render: Renderer2,
    private router: Router
    ) { }

  ngOnInit() {
    return new Promise(resolve => {
      if (localStorage.getItem('chatCryProfile')) {
        this.user = JSON.parse(localStorage.getItem('chatCryProfile'));
        setTimeout(() => {
          this.sendMessage('Digite "esqueça" para que eu não lembre de você :´(', false);
          setTimeout(() => this.getUserLogin(), 1000);
        }, 100);
        resolve('login');
      } else {
        this.sendMessage('Bem vindo ao ChatCry!!! \n Muitas conversas emocionantes te aguardam, mas primeiro precisamos tomar os passos inicias certo?', false);
        setTimeout(() => this.sendMessage('Digite "recomeçar" para iniciar de novo, ok?', false), 500);
        setTimeout(() => this.getUserName(), 1000);
        resolve('new user');
      }
    });
  }

  validEmail(email: string): boolean {
    if (!/^[a-z\d\S._-]+@+[a-z\d\S._-]+.+[a-z\S]$/gi.test(email)) { return false; }
    return true;
  }

  sendMessage(message: string, self: boolean, enter?: boolean): Object {
    if (this.inputType == 'password') {
      message = '*'.repeat(message.length);
    }

    const msg = {
      content: message,
      self: self,
      url: 'assets/bot.png',
      enter: false
    };
    if (enter) { msg.enter = true; }

    return this.newMessage = msg;
  }

  receivedMessage(event: string): any {

    this.sendMessage(event, true);

    if (event == 'esqueça' || event == 'Esqueça') { return this.forget(); }
    if (event == 'recomeçar' || event == 'Recomeçar') { return this.restart(); }

    if (this.listeningName) {
      this.user.name = event;
      this.listeningName = false;
      setTimeout(() => this.getUserEmail(), 1000);
    } else if (this.listeningEmail) {
      if (this.validEmail(event)) {

        this.user.email = event.toLowerCase;
        this.listeningEmail = false;
        setTimeout(() => this.getUserPassword(), 1000);

      } else {
        setTimeout (() => this.sendMessage('Desculpe eu não posso usar isto como email :/ Tente denovo', false), 1000);
      }
    } else if (this.listeningPassword) {

      this.user.password = event;
      this.listeningPassword = false;
      this.inputType = 'text';
      setTimeout(() => this.validadePassword(), 1000);

    } else if (this.listeningValidade) {
      this.inputType = 'text';

      if (event == this.user.password) {
        this.listeningValidade = false;
        setTimeout(() => this.getUserImage(), 1000);
      } else {
        setTimeout (() => {
          this.sendMessage('As senhas não bateram ♪ "Teeeeente outra veeeez" ♫', false);
          this.inputType = 'password';
        }, 1000);
      }
    } else if (this.listeningLogin) {
      this.inputType = 'text';
      if (event == this.user.password) {
        setTimeout (() => this.login(), 1000);
        return 'logando';
      } else {
        setTimeout (() => {
          this.sendMessage(this.user.name + ' essa não é sua senha ¬¬', false);
          this.inputType = 'password';
        }, 1000);
      }
      return this.user.password;
    }
    return event;
  }

  getUserName(): void {
    this.sendMessage('Vou te ajudar com isso, por hora preciso que você me diga qual o seu nome completo ;)', false);
    this.listeningName = true;
  }

  getUserEmail(): void {
    this.sendMessage('Seja bem vindo(a) ' + this.user.name + ', gostaria de saber seu e-mail por favor...', false);
    this.listeningEmail = true;
  }


  getUserPassword(): void {
    this.sendMessage('Muito bem! Estamos quase acabando, pode digitar uma senha legal?', false);
    this.listeningPassword = true;
    this.inputType = 'password';
  }

  validadePassword(): void {
    this.sendMessage('Ótimo, só repita sua senha para confirmar :)', false);
    this.listeningValidade = true;
    this.inputType = 'password';
  }

  getUserImage(): void {
    this.sendMessage('Para finalizar vou te pedir uma foto, sorria! :)', false);
    setTimeout(() => this.prompContainer.nativeElement.style.display  = 'block', 3000);
  }

  getUserLogin(): void {
    this.sendMessage('Bem vindo de volta ' + this.user.name + ', Qual sua senha?', false);
    this.listeningLogin = true;
    this.inputType = 'password';
  }

  restart(): object {

    this.user = { name: null, email: null, password: null, avatar: null };
    this.listeningEmail = false;
    this.listeningName = false;
    this.listeningPassword = false;
    this.listeningValidade = false;

    setTimeout(() => {
      this.sendMessage('"O insucesso é apenas uma oportunidade para recomeçar com mais inteligência." - Henry Ford', false);
      this.prompContainer.nativeElement.style.display = 'none';
      setTimeout(() => this.getUserName(), 1000);
    }, 400);

    return this.user;

  }

  uploadAvatar(): void {
    this.input.nativeElement.click();
  }

  avatarLoaded(input): void {

    const reader: FileReader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.render.setStyle(this.avatar.nativeElement, 'visibility', 'visible');
      this.render.setAttribute(this.avatar.nativeElement, 'src', event.target['result']);
      this.user.avatar = event.target['result'];
    });
    reader.readAsDataURL(input.files[0]);

  }

  confirmAvatar(): any {
    if (this.user.avatar == null) { return false; }
    return new Promise(resolve => {
      setTimeout(() => {
        this.prompContainer.nativeElement.style.display  = 'none';
        localStorage.setItem('chatCryProfile', JSON.stringify(this.user));
        this.loginButton();
        resolve(true);
      }, 2000);
    });
  }

  loginButton(): boolean {
    if (localStorage.getItem('chatCryProfile')) {
      this.sendMessage('Deu tudo certo!!! Aperte o botão e veja a magia ;)', false);
      setTimeout(() => this.sendMessage('', false, true));
      return true;
    }
    return false;
  }

  forget(): any {
    this.user = {};
    localStorage.removeItem('chatCryProfile');
    this.inputType = 'text';
    this.getUserName();
    return localStorage.getItem('chatCryProfile');
  }

  login(): void {
    this.user.auth = true;
    localStorage.setItem('chatCryProfile', JSON.stringify(this.user));
    this.redirect();
  }

  redirect(): void {
    this.router.navigate(['main']);
  }

}
