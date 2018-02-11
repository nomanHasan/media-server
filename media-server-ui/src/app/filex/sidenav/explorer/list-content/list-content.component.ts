import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ms-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.scss']
})
export class ListContentComponent implements OnInit {


  @Input() folderData: any = {};
  @Output() folderAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log(this.folderData);
  }

  onClick(event) {
    this.folderAction.emit({
      type: 'play-list',
      data: this.folderData
    });
  }

  onItemClick(event) {
    this.folderAction.emit({
      type: 'play-item',
      data: event
    });
  }

}
