import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Renderer2 } from '@angular/core';


@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

  animating:boolean = false;
  forward:boolean = false;

  active:number = 0;
  headers:HTMLCollection;
  containers:HTMLCollection;
  indicator:HTMLDivElement;

  @ViewChild('header') header:ElementRef;
  @ViewChild('container') container:ElementRef;

  constructor(private render:Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
    this.containers = this.container.nativeElement.querySelectorAll('.tab-content');
    for(let i = 1; i < this.containers.length; i++) 
      this.render.setStyle(this.containers[i], 'display', 'none');

    this.headers = this.header.nativeElement.querySelectorAll('.menuItem');

    let indicatorContainer = this.header.nativeElement.querySelector('#indicator-wrapper');
    
    this.render.setStyle(indicatorContainer, 'height', this.header.nativeElement.clientHeight + 'px');

    this.indicator = this.header.nativeElement.querySelector('#indicator')
  }

  mouseover(item):void {
    if(item == this.active)
      this.render.setStyle(this.indicator,'boxShadow','white 1px 0px 9px 3px');
  }

  mouseout():void {
    this.render.setStyle(this.indicator,'boxShadow','white 1px 0px 9px 1px');
  }

  select(item):boolean {
    if(item == this.active || this.animating) return false;
    
    this.translateIndicator(item);
    this.changeContent(item);
    return true;
  }

  changeContent(content:number):any {
  
    this.animating = true;
    
    

    let actual = this.container.nativeElement.children[this.active];
    let newContent = this.container.nativeElement.children[content];

    this.render.setStyle(newContent, 'display', 'block');
        
    if(content > this.active)
      this.forward = true;
    else 
    this.forward = false;

    setTimeout(() => {
      this.active = content;
      this.animating = false;
      this.render.setStyle(actual, 'display', 'none');
    }, 500);
  }

  translateIndicator(item:number) {
    
    this.render.setStyle(this.indicator,'transform', 'translateY('+((54*item)+(20*item))+'px)');
    
  }

}
