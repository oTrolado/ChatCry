import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UrlPipePipe } from '../../pipes/url-pipe.pipe';
import { FilterContactsPipe } from '../../pipes/filter-contacts.pipe';
import { ChatsComponent } from './chats.component';

describe('ChatsComponent', () => {
  let component: ChatsComponent;
  let fixture: ComponentFixture<ChatsComponent>;
  let groupMock: any = {
    nome: "Cs na casa do mario",
    imagem: "http://cdn.vs.com.br/webedia-temp/1546522793354-csgo-duas-rambos.png",
    ultimoAcesso: new Date,
    ultimaMensagem:{ 
        data: new Date(),
        mensagem: "Perdi o pedal!",
        usuario: "Aquele Carinha",
        imagem: "https://randomuser.me/api/portraits/women/53.jpg"
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsComponent, UrlPipePipe, FilterContactsPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste emissão de info do contato', () => {
    expect(component.emitInfo({nome:'ASs'})).toEqual({nome:'ASs'});
  });

  it('Teste emissão de info do grupo', () => {
    expect(component.emitInfo(groupMock)).toBe('Its a group!');
  });

  it('Teste de emissão de chat do contato/grupo', ()=> {
    expect(component.startChat(groupMock)).toEqual(groupMock);
  });

});
