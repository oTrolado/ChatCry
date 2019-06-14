import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() contactList: Array<any>;
  @Input() filter: string;
  @Output() toggleInfo: EventEmitter<any> = new EventEmitter;
  @Output() chat: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  emitInfo(contact, event?: Event): any {
    if (!!event)
      event.stopImmediatePropagation();

    this.toggleInfo.emit(contact);
    return contact;
  }

  chatStart(contact): object {
    this.chat.emit(contact);
    return contact;
  }

}
