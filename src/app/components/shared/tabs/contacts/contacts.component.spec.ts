import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { UrlPipePipe } from '../../pipes/url-pipe.pipe';
import { FilterContactsPipe } from '../../pipes/filter-contacts.pipe';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let contatoMock: object = {
    imagem:'teste', nome:'Testildo Matanildo', ultimoAcesso: new Date(), mensagem:'Ola joe'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsComponent, UrlPipePipe, FilterContactsPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste de emissão de info do contato', () => {
    expect(component.emitInfo(contatoMock)).toEqual(contatoMock);
  });

  it('Teste de emissão de chat do contato', () => {
    expect(component.chatStart(contatoMock)).toEqual(contatoMock);
  });

});
