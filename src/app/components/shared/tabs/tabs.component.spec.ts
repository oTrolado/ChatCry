import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TabsComponent } from './tabs.component';
import { FilterContactsPipe } from '../filter-contacts.pipe';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  let contatoMock: object = {
    imagem:'teste', nome:'Testildo Matanildo', ultimoAcesso: new Date(), 
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsComponent, FilterContactsPipe ],
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

  it('Teste do card de informações de contato', () => {
    component.floatInfo = true;
    
    component.toggleInfo()
    .then(floatInfo => expect(floatInfo).toBe(false));

    component.toggleInfo(contatoMock)
    .then(floatInfo => expect(floatInfo).toBe(false));

    expect(component.openContact).toEqual(contatoMock);
  });

  it('Teste se o filtro será limpo', () => {
    component.filter = 'Adrian';
    expect(component.clearFilter()).toBeNull();
  });
});
