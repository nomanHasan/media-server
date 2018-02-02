import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {File} from '../../../models/file.model';


@Component({
  selector: 'ms-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() fileList: File[] = [];


  _selectedFile;

  @Input() set selectedFile(value: File) {
    this._selectedFile = value;

    if (!this.fileList) { return; }

    const index = this.fileList.findIndex(f => f._id === value._id);
    this.scrollToSelected(index);
  }


  @Output() fileClicked = new EventEmitter<File>();



  get selectedFile() {
    return this._selectedFile;
  }


  constructor() { }

  ngOnInit() {
  }

  onItemClick(event, f: File) {
    this.fileClicked.emit(f);
  }


  scrollToSelected(index) {
    const matDrawer = document.querySelector('#playlist-list');

    if (!document.querySelector('mat-list-item') || !matDrawer) { return; }

    matDrawer.scrollTop = 48 * index;
  }

}
