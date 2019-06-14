import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, AfterViewInit {

  @Input() groupList: Array<any>;
  @Input() filter: string;
  @Output() toggleInfo: EventEmitter<any> = new EventEmitter;
  @Output() chat: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  emitInfo(group, event?: Event): any {
    if (!!event)
      event.stopImmediatePropagation();
    this.toggleInfo.emit(group);
    return group;
  }

  startChat(group) {
    this.chat.emit(group);
  }
}
