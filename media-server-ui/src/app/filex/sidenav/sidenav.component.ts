import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'ms-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  @Input() selectedFile;
  @Input() fileList;
  @Input() fileListName;
  @Input() folderData;
  @Output() fileClicked = new EventEmitter<any>();
  @Output() searched = new EventEmitter<any>();
  @Output() folderClicked = new EventEmitter<any>();
  @Output() folderAction = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {

  }


  onFileClicked(event) {
    this.fileClicked.emit(event);
  }

  onSearch(event) {
    this.searched.emit(event);
  }

  onFolderSelected(event) {
    this.folderClicked.emit(event);
  }

  onFolderAction(event) {
    this.folderAction.emit(event);
  }

}
