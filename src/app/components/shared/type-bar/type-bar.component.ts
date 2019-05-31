import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { type } from 'os';

@Component({
  selector: 'type-bar',
  templateUrl: './type-bar.component.html',
  styleUrls: ['./type-bar.component.scss']
})
export class TypeBarComponent implements OnInit, OnChanges {

  @Input() type:string;
  @Output() message:any = new EventEmitter();

  password:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.type == 'password') this.password = true;
    else this.password = false;
  }

  textInput(textarea){
    console.log(textarea);
  }

}
