import {Component, OnInit, Input, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {File} from '../../../models/file.model';
import {ViewChild, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {MediaService} from '../../../services/media.service';
import { ITab } from '../../../models/tab.model';

@Component({selector: 'ms-explorer', templateUrl: './explorer.component.html', styleUrls: ['./explorer.component.scss']})
export class ExplorerComponent implements OnInit {

  @Input() folderData;
  @Output() folderAction = new EventEmitter<any>();
  @Output() selected = new EventEmitter < any > ();

  tabs: ITab[] = [
    {
      name: 'artists',
      label: 'Artists',
      entries: [],
      icon: 'people'
    },
    {
      name: 'albums',
      label: 'Albums',
      entries: [],
      icon: 'album'
    },
    {
      name: 'genres',
      label: 'Genres',
      entries: [],
      icon: 'folder'
    }
  ];

  selectedIndex;

  constructor(private mediaService: MediaService) {}


  ngOnInit() {

    this.tabs.forEach(tab => {
      this.mediaService.getTrackByTab(tab.name).subscribe(res => {
        tab.entries = res[tab.name];
      });
    });
  }

  onClick(field, value) {
    this
      .selected
      .emit({field: field.slice(0, -1), value: value});
  }

  onFolderAction(event) {
    this.folderAction.emit(event);
  }

  onTabSelectedIndexChange(event) {
    this.selectedIndex = event;
  }

}
