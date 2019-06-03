import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss']
})


export class TalkComponent implements OnInit, OnChanges {

  @Input() message: any;
  @ViewChild('container') container:ElementRef;

  constructor(private render:Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges() {

    if(!!this.message){
      console.log(this.message);
      if(this.message.self){
        
        let dialoge:HTMLDivElement = this.render.createElement('div');        
        this.render.addClass(dialoge, 'self-dialoge');
        this.render.addClass(dialoge, 'dialoge');
        dialoge.innerHTML = this.message.content;

        let row:HTMLDivElement = this.render.createElement('div');
        this.render.addClass(row, 'dialoge-row');
        this.render.addClass(row, 'typo-body1');
        this.render.appendChild(row, dialoge);

        this.render.appendChild(this.container.nativeElement, row);

      }
    }

    console.log(this.container);

    this.container.nativeElement.scrollTop =
    this.container.nativeElement.scrollHeight;
    
  }

}
