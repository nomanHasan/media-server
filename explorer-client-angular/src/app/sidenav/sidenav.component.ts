import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'fex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  @Input() selectedFile;
  @Input() fileList;
  @Output() fileClicked = new EventEmitter<any>();
  @Output() searched = new EventEmitter<any>();



  constructor() { }

  ngOnInit() {

  }


  onFileClicked(event) {
    this.fileClicked.emit(event);
  }

  onSearch(event) {
    this.searched.emit(event);
  }

}
