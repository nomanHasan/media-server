import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { File } from '../models/file.model';


@Component({
  selector: 'fex-filex',
  templateUrl: './filex.component.html',
  styleUrls: ['./filex.component.scss']
})
export class FilexComponent implements OnInit {

  constructor(
    private fileService: FileService
  ) { }

  fileList: File[];
  playingFileSrc = '';
  selectedFile: File;


  playerState = {
    playing: false
  };

  ngOnInit() {

    this.fileService.getFiles().subscribe(res => {
      this.fileList = res;
      this.selectedFile = this.fileList[0];
      this.setPlayingFileSrc(this.selectedFile._id);
    });

  }


  onFileClicked(file: File) {
    this.selectedFile = file;
    this.setPlayingFileSrc(file._id);
  }


  setPlayingFileSrc (id) {
    this.playingFileSrc = this.fileService.FILE_URL + id;
  }

  skipNext(event) {
    let index = this.fileList.indexOf(this.selectedFile);
    this.selectedFile = this.fileList[++index];
    this.setPlayingFileSrc(this.selectedFile._id);
  }

  skipPrevious(event) {

  }


}
