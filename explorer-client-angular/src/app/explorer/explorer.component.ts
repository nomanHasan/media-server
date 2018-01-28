import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { File } from '../models/file.model';

@Component({
  selector: 'fex-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {


  @Input() fileList: File[];

  @Output() fileClicked = new EventEmitter<File>();

  constructor() { }

  ngOnInit() {
  }


  onItemClick(event, f: File) {
    this.fileClicked.emit(f);
  }

}
