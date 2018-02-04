import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ms-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() folderData: any = {};
  @Output() folderAction = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('msfolder', this.folderData);
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
