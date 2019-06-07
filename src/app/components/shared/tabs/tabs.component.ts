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

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

    animating: boolean = false;
    forward: boolean = false;

    floatInfo: boolean = false;

    openContact: Object = { nome: '', imagem: '', ultimoAcesso: '' };

    active: number = 0;
    headers: HTMLCollection;
    containers: HTMLCollection;
    indicator: HTMLDivElement;

    @Input() contactList: any;
    @Output() menuToggle: EventEmitter<boolean> = new EventEmitter;

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
        for (let i = 1; i < this.containers.length; i++)
            this.render.setStyle(this.containers[i], 'display', 'none');

        this.headers = this.header.nativeElement.querySelectorAll('.menuItem');

        let indicatorContainer = this.header.nativeElement.querySelector('#indicator-wrapper');

        this.render.setStyle(indicatorContainer, 'height', this.header.nativeElement.clientHeight + 'px');

        this.indicator = this.header.nativeElement.querySelector('#indicator');

        this.resize();
    }


    mouseover(item): void {
        if (item == this.active)
            this.render.setStyle(this.indicator, 'boxShadow', 'white 1px 0px 9px 3px');
    }

    mouseout(): void {
        this.render.setStyle(this.indicator, 'boxShadow', 'white 1px 0px 9px 1px');
    }

    select(item): boolean {
        if (item == this.active || this.animating) return false;

        this.translateIndicator(item);
        this.changeContent(item);
        return true;
    }

    changeContent(content: number): any {

        this.animating = true;

        let actual = this.container.nativeElement.children[this.active];
        let newContent = this.container.nativeElement.children[content];

        this.render.setStyle(newContent, 'display', 'flex');

        if (content > this.active)
            this.forward = true;
        else
            this.forward = false;

        setTimeout(() => {
            this.active = content;
            this.animating = false;
            this.render.setStyle(actual, 'display', 'none');
        }, 490);
    }

    toggleInfo(container?: HTMLDivElement, index?: number): boolean {

        if (!!container)
            container.scrollTop = 0;

        if (index != undefined)
            this.openContact = this.contactList[index];

        return this.floatInfo = !this.floatInfo;

    }

    translateIndicator(item: number): void {
        let itemHeight:number = this.menuIt.nativeElement.clientHeight;
        this.render.setStyle(this.indicator, 'transform', 'translateY(' + (itemHeight * item) + 'px)');
    }

    menutoggle(): any {
        return this.menuToggle.emit(true);
    }

    sanitizeURL(url: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    resize() {
        let itemHeight:number = this.menuIt.nativeElement.clientHeight;
        if(window.innerWidth < 480)
            this.render.setStyle(this.indicator, 'height',itemHeight + 'px');
    }

}
