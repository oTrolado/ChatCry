import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Renderer2 } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

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
    if(item = this.active) return false;
   
    this.translateIndicator(item);
    this.active = item;

  }

  translateIndicator(item:number) {
    console.log(this.header);
    
    console.log(this.headers[item]["clientTop"]);
  }

}
