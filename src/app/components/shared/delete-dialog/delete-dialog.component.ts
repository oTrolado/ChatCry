import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit, OnChanges {

  @Input() show: any;
  @Output() response: EventEmitter<boolean> = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.show === 0) this.show = true;
  }

  emit(choice: boolean): void {
    this.response.emit(choice);
  }

}
