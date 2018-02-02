import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ms-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit {


  @Input() folderData: any = {};
  @Output() folderAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    this.folderAction.emit({
      type: 'play-folder',
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
