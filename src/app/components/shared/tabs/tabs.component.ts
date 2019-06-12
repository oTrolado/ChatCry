import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Renderer2,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { promise } from 'protractor';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

    animating = false;
    forward = false;
    floatInfo = false;

    active = 0;

    filter: string;
    chatList: Array<any> = [];

    headers: HTMLCollection;
    containers: HTMLCollection;
    indicator: HTMLDivElement;
    openContact: Object = { nome: '', imagem: '', ultimoAcesso: '' };

    @Input() contactList: any;
    @Output() menuToggle: EventEmitter<boolean> = new EventEmitter;
    @Output() chat: EventEmitter<any> = new EventEmitter;

    @ViewChild('header') header: ElementRef;
    @ViewChild('container') container: ElementRef;
    @ViewChild('menuIt') menuIt: ElementRef;

    constructor(
        private render: Renderer2,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

        this.containers = this.container.nativeElement.querySelectorAll('.tab-content');
        for (let i = 1; i < this.containers.length; i++) {
            this.render.setStyle(this.containers[i], 'display', 'none');
        }

        this.headers = this.header.nativeElement.querySelectorAll('.menuItem');

        const indicatorContainer = this.header.nativeElement.querySelector('#indicator-wrapper');

        this.render.setStyle(indicatorContainer, 'height', this.header.nativeElement.clientHeight + 'px');

        this.indicator = this.header.nativeElement.querySelector('#indicator');

        setTimeout( () => {
            this.chatList = this.contactList.filter( contato => contato['mensagem']);
        }, 650);
        
        this.resize();
    }

    mouseover(item): void {
        if (item == this.active) {
            this.render.setStyle(this.indicator, 'boxShadow', 'white 1px 0px 9px 3px');
        }
    }

    mouseout(): void {
        this.render.setStyle(this.indicator, 'boxShadow', 'white 1px 0px 9px 1px');
    }

    select(item): Promise<any> {
        if (item === this.active || this.animating) { return new Promise(res => res(0))}

        this.translateIndicator(item);
        return this.changeContent(item);
    }

    changeContent(content: number): Promise<any> {

        this.animating = true;

        const actual = this.container.nativeElement.children[this.active];
        const newContent = this.container.nativeElement.children[content];

        this.render.setStyle(newContent, 'display', 'flex');

        if (content > this.active) {
            this.forward = true;
        } else {
            this.forward = false;
        }

        return new Promise( resolve => {
            setTimeout(() => {
                this.active = content;
                this.animating = false;
                this.render.setStyle(actual, 'display', 'none');
                resolve(this.active);
            }, 490);
        });
        
    }



    translateIndicator(item: number): void {
        const itemHeight: number = this.menuIt.nativeElement.clientHeight;
        this.render.setStyle(this.indicator, 'transform', 'translateY(' + (itemHeight * item) + 'px)');
    }

    menutoggle(): any {
        return this.menuToggle.emit(true);
    }

    resize() {
        const itemHeight: number = this.menuIt.nativeElement.clientHeight;
        if (window.innerWidth < 480) {
            this.render.setStyle(this.indicator, 'height', itemHeight + 'px');
        }
    }

    sanitizeURL(url: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    toggleInfo(element?: object, event?: Event): Promise<boolean> {        
        if (!!element) 
            this.openContact = element;
        if(event)
            event.stopImmediatePropagation();
        
        return new Promise(resolve => {
            setTimeout(() => resolve(this.floatInfo = !this.floatInfo), 200);
        }); 
    }

    clearFilter():any {
        this.filter = null;
        return this.filter;
    }

    chatStart(contact: any): Promise<any> {
        this.chatList.push(contact);
        this.chatWith(contact);
        return new Promise(res => {
            setTimeout(() => res(this.active), 600);
        });
    }

    chatWith(contact) {
        this.chat.emit(contact);
    }
}
