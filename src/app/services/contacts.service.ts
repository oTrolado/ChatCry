import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }

  getContacts() {
    return this.http.get('http://demo4084944.mockable.io/contacts');
  }
}
