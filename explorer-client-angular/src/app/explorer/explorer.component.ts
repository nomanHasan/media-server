import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { File } from '../models/file.model';
import { ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';



@Component({
  selector: 'fex-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {


  @Input() fileList: File[] = [];

  _selectedFile;

  @Input() set seletectedFile(value: File) {
    this._selectedFile = value;

    if (!this.fileList) { return; }

    const index = this.fileList.findIndex(f => f.name === value.name);
    console.log(value, index);


    // const matDrawer = document.querySelector('mat-drawer');

    // if (!document.querySelector('mat-list-item')) { return; }

    // console.log(document.querySelector('mat-list-item'));

    // matDrawer.scrollTop = 48 * index;


  }

  get selectedFile() {
    return this._selectedFile;
  }

  @Output() fileClicked = new EventEmitter<File>();
  @Output() fileSearch = new EventEmitter<any>();

  searchStream: Subject<any> = new Subject<any>();

  search;

  constructor() { }

  ngOnInit() {

    this.searchStream
    .debounceTime(300)
    .distinctUntilChanged().subscribe(val => {
      this.fileSearch.emit(this.search);
    });
  }

  onSearchKeyUp(event) {
    this.searchStream.next(event);
  }


  onItemClick(event, f: File) {
    this.fileClicked.emit(f);
  }

}
