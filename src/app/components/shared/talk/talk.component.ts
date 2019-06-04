import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})


export class TalkComponent implements OnInit, OnChanges {

  previus:boolean = true;

  @Input() message: any;
  @ViewChild('container') container:ElementRef;

  constructor(private render:Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges() {

    if(!!this.message){

      let dialoge:HTMLDivElement = this.render.createElement('div');
      this.render.addClass(dialoge, 'dialoge');
      dialoge.innerHTML = this.message.content;

      let row:HTMLDivElement = this.render.createElement('div');
      this.render.addClass(row, 'dialoge-row');
      this.render.addClass(row, 'typo-body1');

      if(this.message.self) this.render.addClass(dialoge, 'self-dialoge');
      else {
        
        this.render.addClass(dialoge, 'other-dialoge');
        if(this.previus != this.message.self){
          
          let img:HTMLImageElement = this.render.createElement('img');
          this.render.setAttribute(img, 'src', this.message.url);
          this.render.setAttribute(img, 'class','botAvatar raized');
          
          this.render.appendChild(row, img);
          
        }
        else this.render.addClass(dialoge,'outher-dialoge-spacing');
        
      
      }

      this.render.appendChild(row, dialoge);
      this.render.appendChild(this.container.nativeElement, row);

      this.previus = this.message.self;
    }

    this.container.nativeElement.scrollTop =
    this.container.nativeElement.scrollHeight;
    
  }

}
