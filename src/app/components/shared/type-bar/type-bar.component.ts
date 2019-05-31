import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'type-bar',
  templateUrl: './type-bar.component.html',
  styleUrls: ['./type-bar.component.scss']
})
export class TypeBarComponent implements OnInit, OnChanges {

  @Input() type:string;
  @Output() message:any = new EventEmitter();

  @ViewChild("textarea") textarea: ElementRef;
  @ViewChild("input") input: ElementRef;

  password:boolean = false;

  constructor(private render:Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.type == 'password') this.password = true;
    else this.password = false;
  }

  textInput(textarea){
    
    this.render.setStyle( textarea,'height', 'auto');
    this.render.setStyle( textarea,'height', (textarea.scrollHeight ) + 'px');
    
  }

  send(){
    if(this.password && this.input.nativeElement.value != '') {
    
      this.message.emit(this.input.nativeElement.value);
      this.input.nativeElement.value = '';
    
    } else if(this.textarea.nativeElement.value != '') {

      this.message.emit(this.textarea.nativeElement.value);
      this.textarea.nativeElement.value = '';
      this.textInput(this.textarea.nativeElement);
    
    }
  }

}
