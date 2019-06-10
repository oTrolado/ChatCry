import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  openContact: Object = { nome: '', imagem: '', ultimoAcesso: '' };
  floatInfo: boolean = false;
  
  @Input() contactList:any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  sanitizeURL(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  toggleInfo(container?: HTMLDivElement, index?: number): boolean {

    if (!!container)
        container.scrollTop = 0;

    if (index != undefined)
        this.openContact = this.contactList[index];

    return this.floatInfo = !this.floatInfo;

}

}
