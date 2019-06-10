import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { AuthGuard } from './auth.guard';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ],
    providers: []
  }));

  it('should be created', () => {
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });
});
