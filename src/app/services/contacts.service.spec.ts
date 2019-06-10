import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from './contacts.service';
import { HttpClientModule } from '@angular/common/http';


describe('ContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HttpClient],
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: ContactsService = TestBed.get(ContactsService);
    expect(service).toBeTruthy();
  });
});
