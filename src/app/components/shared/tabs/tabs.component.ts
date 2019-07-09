import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Renderer2,
    Input,
    Output,
    EventEmitter,
    OnChanges
} from '@angular/core';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit, OnChanges {

    animating: boolean = false;
    forward: boolean = false;
    floatInfo: boolean = false;
    floatGroupInfo: boolean = false;

    active:number = 0;

    filter: string;
    chatList: Array<any> = [];
    activeChat: string;
    deletingChat: any;

    headers: HTMLCollection;
    containers: HTMLCollection;
    indicator: HTMLDivElement;
    openContact: any = { nome: '', imagem: '', ultimoAcesso: '' };
    openGroup: any = { nome: '', imagem: '', ultimoAcesso: '' };

    @Input() contactList: Array<any>;
    @Input() groupList: Array<any>;
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

        this.resize();
    }

    ngOnChanges() {
        this.fillMessages(this.contactList, this.groupList); 
    }

    fillMessages(listContact, listGroup) {
        if(listContact)            
            listContact.map(contact => {//prenche a lista com os contatos
                if(contact.mensagem && !this.alreadyOpen(contact)){                
                    this.chatList.push(this.parseContact(contact));}
                else if(!this.alreadyOpen(contact) && localStorage.getItem('chatCry'+contact.nome))
                    this.chatList.push(this.parseContact(contact)); 
            });
        if(listGroup)  
            listGroup.map(group => {//prenche a lista com os grupos
                if(group.ultimoAcesso.mensagem && !this.alreadyOpen(group))               
                    this.chatList.push(this.parseContact(group));
                else if(!this.alreadyOpen(group) && localStorage.getItem('chatCry'+group.nome))
                    this.chatList.push(this.parseContact(group)); 
                
            });
        if(this.chatList.length > 0 && !this.activeChat)
            this.chatWith(this.chatList[0]);
            
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

    toggleContactInfo(element?: any, event?: Event): any {        
        if (!!element) 
            this.openContact = element;
        
        if(event)
            event.stopImmediatePropagation();
        
        return new Promise(resolve => {
            setTimeout(() => { 
                this.floatInfo = !this.floatInfo;
                setTimeout(() =>  resolve(this.floatInfo), 100);
            }, 200);
        }); 
    }

    toggleGroupInfo(element?: object, event?: Event): Promise<boolean> {                
        if (!!element) 
            this.openGroup = element;
        if(event)
            event.stopImmediatePropagation();
        
        return new Promise(resolve => {
            setTimeout(() => { 
                this.floatGroupInfo = !this.floatGroupInfo;
                setInterval(() =>  resolve(this.floatGroupInfo), 100);
            }, 200);
        }); 
    }

    clearFilter():any {
        this.filter = null;
        return this.filter;
    }

    parseContact(contact: any) {
        contact = JSON.parse(JSON.stringify(contact));
        if(contact.ultimoAcesso.data){
            contact.ultimaMensagem = contact.ultimoAcesso;
            contact.ultimoAcesso = contact.ultimaMensagem.data;
        }
        return contact;
    }

    chatStart(contact: any) {
        contact = this.parseContact(contact);
        this.select(0);
        if(this.alreadyOpen(contact)) 
            return 'already open';
        if(contact.ultimoAcesso.data){
            contact.ultimaMensagem = contact.ultimoAcesso;
            contact.ultimoAcesso = contact.ultimaMensagem.data;
        }
        this.chatList.push(contact);
        this.chatWith(contact);
        return this.chatList;
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

    deleteChatResponse(response: boolean): any {
        let res;
        if(response) {
            res = this.chatList.splice(this.deletingChat, 1)[0];
            if(this.chatList[this.deletingChat -1])
                this.chatWith(this.chatList[0]);

            else if(this.chatList[0])
                this.chatWith(this.chatList[0]);

            if(localStorage.getItem('chatCry'+res.nome))
                localStorage.removeItem('chatCry'+res.nome);
        }
        else 
            res = this.chatList;
        setTimeout(() => this.deletingChat = undefined, 400);
        
        return res;
    }

    deleteChat(nome: string): any {
        this.chatList.map((chat, index)=>{ 
            if(chat.nome === nome) this.deletingChat = index;
        });        
    }

}
