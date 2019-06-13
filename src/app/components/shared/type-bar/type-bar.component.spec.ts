import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBarComponent } from './type-bar.component';

describe('TypeBarComponent', () => {
  let component: TypeBarComponent;
  let fixture: ComponentFixture<TypeBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste do input de senha sendo ativado', async () => {
    component.type = 'password';
    component.password = true;
    await setTimeout( () => expect(
      component.input.nativeElement.type
    ).toBe('password'), 100);
  });

  it('Teste de envio da mensagem na textarea', () =>{
    component.password = false;
    component.textarea.nativeElement.value = 'Ola Robso';

    component.send();

    expect(component.textarea.nativeElement.value).toBe('');
  });

  it('Teste de envio da mensagem do input', async () =>{
    component.password = true;
    await setTimeout( () => {
      component.input.nativeElement.value = '1234';
      component.send();
      expect(component.input.nativeElement.value).toBe('');
    }, 100);
  });
});
