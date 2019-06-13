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
    activeChat: string;

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
        private render: Renderer2
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

        this.fillMessages(this.contactList);

        this.resize();
    }

    fillMessages(list) {
        if(!list)
            setTimeout(() => this.fillMessages(this.contactList), 50);
        else{
            this.chatList = list.filter(contato => contato.mensagem);
            this.contactList.map( contact => {
                if(!this.alreadyOpen(contact) && localStorage.getItem('chatCry'+contact.nome))
                    this.chatList.push(contact)                
                
            });
            if(this.chatList.length > 0)
                this.chatWith(this.chatList[0]);
        }
        return this.contactList;
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
        if(window.innerWidth < 800 )        
            return this.menuToggle.emit(true);
    }

    resize() {
        const itemHeight: number = this.menuIt.nativeElement.clientHeight;
        if (window.innerWidth < 480) {
            this.render.setStyle(this.indicator, 'height', itemHeight + 'px');
        }
    }

    toggleInfo(element?: object, event?: Event): Promise<boolean> {        
        if (!!element) 
            this.openContact = element;
        if(event)
            event.stopImmediatePropagation();
        
        return new Promise(resolve => {
            setTimeout(() => { 
                this.floatInfo = !this.floatInfo;
                setInterval(() =>  resolve(this.floatInfo), 100);
            }, 200);
        }); 
    }

    clearFilter():any {
        this.filter = null;
        return this.filter;
    }

    chatStart(contact: any) {
        this.select(0);
        if(this.alreadyOpen(contact)) return 'already open'
        this.chatList.push(contact);
        this.chatWith(contact);
    }

    chatWith(contact) {
        this.activeChat = contact.nome;
        this.chat.emit(contact);
        this.menutoggle();
    }

    alreadyOpen(contact): boolean {
        let chatsFiltred = this.chatList.filter( chat => chat.nome === contact.nome);
        if(chatsFiltred.length > 0) return true;
        else return false;
    }

}
