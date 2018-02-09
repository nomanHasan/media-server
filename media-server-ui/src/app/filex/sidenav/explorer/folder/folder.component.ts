import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FolderService} from '../../../../services/folder.service';


@Component({
  selector: 'ms-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  folderData: any = {};
  @Output() folderAction = new EventEmitter<any>();

  constructor(
    private folderService: FolderService
  ) { }

  folderNavHistory = [];
  folderNavIndex = -1;

  ngOnInit() {
    console.log('msfolder', this.folderData);

    this.accessFolder();

  }

  onPlayListClick(event) {
    this.folderAction.emit({
      type: 'play-folder',
      data: this.folderData
    });
  }

  onPlayAllClick(event) {
    this.folderAction.emit({
      type: 'play-folder-all',
      data: this.folderData
    });
  }

  onItemClick(event) {
    this.folderAction.emit({
      type: 'play-item',
      data: event
    });
  }

  onFolderClick(event) {
    this.accessFolder(event._id);
  }

  accessFolder(id?) {

    const folderIndex = this.folderNavHistory.findIndex(f => f._id === id);

    if (folderIndex < 0) {
      this.folderService.getFolderContent(id).subscribe(res => {
        this.folderData = res;
        this.folderNavHistory = this.folderNavHistory.slice(0, this.folderNavIndex + 1);
        this.folderNavHistory.push(this.folderData);
        this.folderNavIndex += 1;
      });
    } else {
      this.folderData = this.folderNavHistory[folderIndex];
      this.folderNavIndex = folderIndex;
    }
  }

  onNavHistoryClick(f) {
    this.accessFolder(f._id);
  }


  onNavigationBack(event) {
    if (this.folderNavIndex < 1) {
      return;
    }
    this.folderNavIndex -= 1;
    const id = this.folderNavHistory[this.folderNavIndex]._id;
    this.accessFolder(id);
  }

  onNavigationForward(event) {
    if (this.folderNavIndex >= this.folderNavHistory.length) {
      return ;
    }
    this.folderNavIndex += 1;
    const id = this.folderNavHistory[this.folderNavIndex]._id;
    this.accessFolder(id);
  }


}
