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

  ngOnInit() {
    console.log('msfolder', this.folderData);

    this.folderService.getFolderContent().subscribe(res => {
      this.folderData = res;
      this.folderNavHistory.push(res);
    });

  }

  onClick(event) {
    // this.folderAction.emit({
    //   type: 'play-folder',
    //   data: this.folderData
    // });
  }

  onItemClick(event) {
    // this.folderAction.emit({
    //   type: 'play-item',
    //   data: event
    // });
  }

  onFolderClick(event) {
    this.accessFolder(event._id);
  }

  accessFolder(id) {
    this.folderService.getFolderContent(id).subscribe(res => {
      this.folderData = res;
      this.folderNavHistory.push(res);
    });
  }



  onNavigationBack(event) {
    this.folderNavHistory.pop();
    const id = this.folderNavHistory[this.folderNavHistory.length - 1]._id;
    if(this.folderNavHistory.length > 1) {
      this.folderNavHistory.pop();
    }
    this.accessFolder(id);
  }

  onNavigationForward(event) {

  }


}
