import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabsComponent } from './tabs.component';
import { FilterContactsPipe } from '../pipes/filter-contacts.pipe';
import { UrlPipePipe } from '../pipes/url-pipe.pipe';
import { ChatsComponent } from './chats/chats.component';
import { GroupsComponent } from './groups/groups.component';
import { ContactsComponent } from './contacts/contacts.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  let contatoMock: any = {
    imagem:'teste', nome:'Testildo Matanildo', ultimoAcesso: new Date(), mensagem:'Ola joe'
  }
  let contatoMock2: any = {
    imagem:'teste', nome:'Mario Noitildo', ultimoAcesso: new Date()
  }
  let groupMock: any = {
    "nome": "Cs na casa do mario",
    "imagem": "http://cdn.vs.com.br/webedia-temp/1546522793354-csgo-duas-rambos.png",
    "ultimoAcesso":{ 
        "data": new Date(),
        "mensagem": "Perdi o pedal!",
        "usuario": "Aquele Carinha",
        "imagem": "https://randomuser.me/api/portraits/women/53.jpg"
    }
  }
  let group2Mock: any = {
    "nome": "Cs na casa do mario",
    "imagem": "http://cdn.vs.com.br/webedia-temp/1546522793354-csgo-duas-rambos.png",
    "ultimoAcesso":{ 
        "data": new Date(),
        "usuario": "Aquele Carinha",
        "imagem": "https://randomuser.me/api/portraits/women/53.jpg"
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TabsComponent, 
        FilterContactsPipe, 
        ChatsComponent, 
        UrlPipePipe ,
        GroupsComponent,
        ContactsComponent
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste do card de informações de contato', async () => {
    component.floatInfo = true;
    
    await component.toggleContactInfo()
    .then(floatInfo => expect(floatInfo).toBe(false));

    await component.toggleContactInfo(contatoMock)
    .then(floatInfo => expect(floatInfo).toBe(true));

    expect(component.openContact).toEqual(contatoMock);
  });

  it('Teste do card de informações do grupo', async () => {
    component.floatGroupInfo = true;

    await component.toggleGroupInfo()
    .then(floatGroupInfo => expect(floatGroupInfo).toBe(false));

    await component.toggleGroupInfo(groupMock)
    .then(floatGroupInfo => expect(floatGroupInfo).toBe(true));

    expect(component.openGroup).toEqual(groupMock);
  });

  it('Teste se o filtro será limpo', () => {
    component.filter = 'ass';
    expect(component.clearFilter()).toBeNull();
  });

  it('Teste do filtro de contatos com mensagem', async () => {

    expect(component.chatList).toEqual([]);
    component.contactList = [contatoMock];
    await setTimeout(() => expect(component.chatList).toEqual([contatoMock]),600);

  });

  it('Teste do filtro se contato já esta na lista de chats', () => {
    component.chatList = [contatoMock];
    expect(component.alreadyOpen(contatoMock)).toBe(true);
    expect(component.alreadyOpen(contatoMock2)).toBe(false);
  });

  it('Teste de preenchimento de lista chats com contatos salvos', async () => {
    component.chatList = [];
    component.contactList = [contatoMock2];
    component.groupList = [group2Mock];

    localStorage.setItem(
      'chatCry' + contatoMock2.nome,
      JSON.stringify(contatoMock2)
    );
    localStorage.setItem(
      'chatCry' + group2Mock.nome,
      JSON.stringify(group2Mock)
    );
    component.fillMessages([contatoMock2],[group2Mock]);
    await setTimeout(() =>{
      expect(component.chatList[0]).toEqual(contatoMock2);
      expect(component.chatList[1]).toEqual(group2Mock);
    }, 400)
    
  });
  
});
