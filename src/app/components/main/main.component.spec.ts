import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { TabsComponent } from '../shared/tabs/tabs.component';
import { TalkComponent } from '../shared/talk/talk.component';
import { TypeBarComponent } from '../shared/type-bar/type-bar.component';
import { MainComponent } from './main.component';
import { FilterContactsPipe } from '../shared/pipes/filter-contacts.pipe';
import { UrlPipePipe } from '../shared/pipes/url-pipe.pipe';
import { ChatsComponent } from '../shared/tabs/chats/chats.component';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let contatoMock = {nome:'Jane Alins', ultimoAcesso: new Date(), imagem:'base64/testesteste', mensagem:'o sol'}

  beforeAll(() => {
    localStorage.setItem('chatCryProfile', '{"name":"Robso Basilio","password":"1","avatar":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACWAJYDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAwABAgQFBgf/xAA4EAABBAECBAQDBwIHAQEAAAABAAIDEQQFIRIxQVETImFxFDKBBiNSkaGxwULhFRYzNGLR8EPx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIREBAQACAgICAwEAAAAAAAAAAAECEQMhEjEEIhMyQVH/2gAMAwEAAhEDEQA/ANxz+ZVvTcklsgYae1Z92liyfD6g035X7FY2ddNZ7ddhZuS+F1SuBroi6bJLlS+FNI9xa7ez0VHCdwSFv1C0cFvhapfR7Cse7dVp6iGrTHjELdgOaxvhy49atamoHjzJPekCMgE7fkss/tk7OP649KRxztdEHqhSQDfYV6LSriBABA50q8sTidgs8sWsyUHQFFga+F4ra9v1BVkt8PdwUSQ4W3fqpk0Ld9Oi02YPaLPmq69N/wD30XQsNsB7ritPzAxxb1ANfVb7NbxsbHj8dzvO7hFC69V28ec1uvP5ePLepGx0U2HZR6J2Locye6YWpJuqZFSrzNo2rKDOLainAEkklJvI2u3Q8iwziHNu6XHSHK+2EeiRukwcjxIIZweYorfxvPJC8cwaXFfZrJ8WKbGcd2mwuw06TyjuCue9ZNp3Acpp+Ikv8RUG+GWF9gAdyj6vIzGc+QkAOFridVz9SydJ8bCYGNe4NDOKpCCeZvkK/ZZ2fbTpxt8ZXWDJj3c3cA0aVd2ZDuDIGk77lZeiS5LdLAna0PN2E2VjjMeG8fhtNg0OajybeKy7Ljkd93JuDW4oH6p3StPUDsTtax9Q0nEyTjh2O77i+FzG0XX+I9Vb0zT48fcxVXy2SaUZ630eMuu2hjEnJaGus3RIRtVyWNfFjOka13CSBfP1QorGW0iqsIWt4T8+djGUxtW6Q8wBVge9In6XRTX5Jt6PgvMmBjvd8zomk+9Kw3YqjpjgzSsRrtiIm8/ZWfGaCvSxvUeVlPtVnom6oJyh0BQ3ZR6BV5ROqtqEgtqpuyn9CgvneebkvIaHsDqElRc8dSklu/4rp5ZksdjzuieKc00Qqrngh1upo5ldb9qNJfqGSJsKM8Z5rKg+yOfK6LxQAwbuH1U7NgaLnRYuuMp7gJDwmxsvRMV/BkFvQ7hZn+RGTTRSF4DmGy6qXRR6KGlhMp8ooKM8bl6VjlIDqQ8SKM8+bT/Cxn4ZfG4H5TyGy6LKwfDxnvDy4tFgLmM500gbjxuLS81fYLDknje3bwZTLEXGiZ4XA1wdwg8twqZheZTwtLie/ILXbhOxoBGxzYqFC1jaiXscI5ZgWn5uHe1OWPTeZy9RCPPMWQ/HlhPC01xN5K7FksdxcNG1Ql1TT8DH+ImZJwCgSxhcBdADYdyPzWjBHFllkzW8JPMbAqfGlc5/YeFpfI11bA9Fs4+EMzLEYcAze9unos6OGR54HCt9z6LbwCY5ppf6Iozfv2V8WO7phy56m41mTRu4msIJYeFzeoUuP0XHadJmR666ZklwSC5Gnq7uF2cYErARsey7vF59DLj2UTxIzonjpfshuBHNBBEHuhuHqjFCBF78uqAEW90kR4DneQCuvRJMHEddgpeH6pwpKTJrdqPJTDQmCkmEXsD43MI2cKXMZenvbMw0PK7mupG52VfMxmy0AfvO3dZ8nH5xrxcvhXGZ2NkS6nHlSTvkxmBzXY4NWTVOv03/ADRg7ChjDxp7Hyb/AOtIX8z2K2ZcYhgJbT287CrynYNDeZsmgsLLHZjlLGTJHPmNa7IADWG2tApoI5bIr4w1jOA0SbB7fVWBcklCxZJ3PXug5ThGxodsXigDuSewU4y0Z2QfDLntYxo4nvNNrqVvZUTcHRZmt8zyKJ/E4mk2jab8FAJph984UB+AdvdTzJWyzMxwboiRw9Adv1/ZdnFx+M3XDy8nldRmaVj8XG1zaexxuxz6LoohwtCo4bGmUyciTutEDstWW0uIpyWkU4WmTI0ApIAd4z9CqjwWnlR7K+VB4a8U8fXqp0Ns9zjQHQJKckJB8rmuHukpMQKQKGCpApGmixxuf6Dunii5F436BHJDR6q5iWwpXNgjPCN0GJtDxXfM7l7KUrTLIG9Oak8gsbXdX6Jz2bLk6c50YZ49ONRl1F7Tv5T39FUxNW0rVo3/AA07myMJbJE9vC9p7ELptSwGahjFhriryu7Fcl/lls87pqc3Kb5XPYacT/J9+ajPDfca8eeuqfKzMXAZxA2Rys7n2CpxQZDYX52d5cmVpEUTucMfcjo4/oPcrPkws6LX8PGnjdKxzw4TtZTeFps8X4aC6eaN2sakOFhbi8QBNVxALPix7u56XzXqavtrw5Jx9Ex5J3G2wtJvny2VTTY5ZC7InH3k7y6vwtAoD90+ZkDK1FuExu0VF2219votCGMNlDANmgDl6LZznxG1HfqVYY62lx9fyQm+THf6Wp8sf2aUBIyFo7ogcHXR5Ku4gi/TunZbZHetOr6AIAzncI9SgPJPNSc7iN/RQKVCCSi6gd7I9N0lJoAq5jRbcbh7BUMIjKkNbsbzWsOaMYKkOdoM0gG/OlJz7eAOSDIOJ4aDe60JJzi2Iu9FEf6LPU2h5j+FgYEVoqJg9EGMDbQhCJrHvO1udxeyIzlSCZOLIDB3QQGTiuyZQOEcFji2q1YZAyPdoArkrOwb/dDBvZBMvFx2t1PIkI8xaDauMA8d/wD2hx7ai71YijaZ3Pkko0u2PJv36qRFx1/wP7J5x924bpD5mg9q5oIIG42nfcBSDrf7tA/VCZ/tmX+DsoQv4pR6WOXp/ZEFHJokepUSncfNaa+iRoF19QD68kknN3SSAuBitw8NkQ3dVuPcq035kIvpjq5hJktgb791WiKQ/egBO1o4y7oN+SYtJePQoGqZYxMJ7+p2aO5QFd8nxGZwhaDuaz9JxnNj8aX53bq+d3lB1NmzSVUxDx5TnHpatnyxlVdPF8Tt/MT/AO/VMl1x5od+f6KRIJPLZDjNucfVBQA23Oa7mC2tvdSdtLf8KUwDp4njajRJCaQU4H+yRiSbtP06Jjs5vuk4+S/5UHnqgBf0EdiRzVDHnDNQMZPzjbdXXu4XvHZywcmYx6ljkH/6tH60iG6FxsqBfSYnhFlQc4Ebcu4SAvFxDZJCY+xzpJGiWZHmOaujkKvDeC3ZpViWMTR0T7G1Va834Mo36HuqNdjkbIAeXosnUCM3V4MW/LGDIR36K4HcDS3+VlwE/wCZQSdnRED90aEdAwcLNtgot3J/7Uz8qYbJBDJdwwO9lHGjMTY29mb7dbSkHiPa3oTv7IrTch9AmVQEfDZs2dv1TR9SFN58vP8AVDhNx2goUl8LSehBUpBYTkNewgHc9t07mvr5SfokaF3D16obzY/usTU9bm04Fk8JgYXEMke3Y/VZLtcilIvOsdg7Zc+fyMcbp04fGzym3R5MnDlSDlYB/QLltTyHl0sjD54zxNPqDYRI9UxpZuGGYPk/47kKjmF3iPJste02VXFzY53RcnBlhNulg1MZ+Hjzt28VoJHY9VaMgBJHIrj9DzQNPjZf+3lfGfzv+V0EeQZh5QaW+nO0oH25w7JIWJG4gucKHRJGg1WOpp326IcwEjSCNxuCqouJ/hv3H9LkQuLUjUJc05mK4xGnNeWPHsg6bN42bES5rpYiWPo8tlTfkw4mbmYz3cMktPjBGzu/8oX2Yj8PVc1/FQIaa/NMO14xdJOeADRVTjtOXV/+IJYjNuc7ttzTxHzyG+3VQ4uCID6lNFKPDmfvQP8ACCEB8W/NQaaO+6I4QwxNIoDuSuS13jjnbkMJa2TbY9QsCfKlPzPcR6lHhcu9pueutPQZNXw4T58hg9jaqz/anEa2oWukPfkF56ZTasQyEt5peGi/Ja19W1WPUon/AOI8PwkbTIY6FGhfX2XKaJqMMrHSsghY8vIHC0bC9ggfa/LfjaE98Zp3iMH6q19njDNpcT5oWmUjd3CLXJ8nfUeh8STxuTdbkksDnM370rMU5je2eOtubT1HYqmIMcU9pkaRtXEa/Ip3NjaC9uxXJux16ljrToelZcPixY7YvGAeXRDhuxzrlaLBpzMKENZb2t6nmloz70jG3/p29r2VzjC9THK2beTlNWxWJZdVY90kxH3jiEk90gj96w306ocUhJMbt66pJKobmfthCGRRZA+drqv3VX7Oam7/ABJkRbZnZu7tQtJJM/47QPLRapQal4+r/CFpprS8+wSSQlqufxbnqjRRjwtu5SSSJna/jiXTJHGrj8w2XCTFJJaY+mWaoXG1Yx3JJJZJjC+2zBNoLoz1lZ+6taJjRt06DhlnbtvTwf3CSS4fk+3p/D/Stj4dzTZne8Ho4D+FWnD4iOGRxDzw0TySSXHXZK9BxR8LiQwNPE2JgYCetBFMpCSS9OPJoZk4ju949qSSSVpf/9k=","auth":true}');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule, FormsModule ],
      declarations: [ 
        MainComponent, 
        TabsComponent, 
        TalkComponent, 
        TypeBarComponent, 
        FilterContactsPipe, 
        ChatsComponent,
        UrlPipePipe 
      ],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste de inicio de chat com contato', () => {
    expect(component.chatWith(contatoMock)).toEqual(
      [{content: undefined, enter: false, self: false, url: "base64/testesteste"}]
    );
  });
});
