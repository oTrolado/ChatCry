import { inject, TestBed } from '@angular/core/testing';
import { UrlPipePipe } from './url-pipe.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';


//let pipe: UrlPipePipe;
let urlMock: string = 'https://www.testeunitari.com.br'

beforeEach(() => {
  TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
 
});

describe('UrlPipePipe', () => {
  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new UrlPipePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('Teste do url sanitizer', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new UrlPipePipe(domSanitizer);
    expect(pipe.transform(urlMock)).toEqual( {"changingThisBreaksApplicationSecurity": "https://www.testeunitari.com.br"});
  }));

});
