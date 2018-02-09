import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {Output} from '@angular/core';
import {MediaService} from '../../../../services/media.service';

@Component({selector: 'ms-track-list', templateUrl: './track-list.component.html', styleUrls: ['./track-list.component.scss']})
export class TrackListComponent implements OnInit {

  folderData;

  @Output() folderAction = new EventEmitter < any > ();

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this
      .mediaService
      .getTracks()
      .subscribe(res => {
        this.folderData = {
          name: 'All Tracks',
          list: res.docs
        };
        console.log(this.folderData);
      });
  }

  onFolderAction(event) {
    this
      .folderAction
      .emit(event);
  }

}
