import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { UrlPipePipe } from '../../pipes/url-pipe.pipe';
import { FilterContactsPipe } from '../../pipes/filter-contacts.pipe';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GroupsComponent,
        UrlPipePipe,
        FilterContactsPipe
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste de emissão de info do grupo', () => {

    expect(component.emitInfo(groupMock))
    .toEqual(groupMock);
    
  });
});
