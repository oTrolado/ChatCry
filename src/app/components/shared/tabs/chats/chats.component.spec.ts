import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UrlPipePipe } from '../../pipes/url-pipe.pipe';
import { FilterContactsPipe } from '../../pipes/filter-contacts.pipe';
import { ChatsComponent } from './chats.component';

describe('ChatsComponent', () => {
  let component: ChatsComponent;
  let fixture: ComponentFixture<ChatsComponent>;

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

  it('Teste emissão do contato', () => {
    expect(component.emitInfo({nome:'ASs'})).toEqual({nome:'ASs'});
  });

});
