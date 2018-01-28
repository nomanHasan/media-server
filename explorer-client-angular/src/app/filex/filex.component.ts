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


  playerState = {
    playing: false
  };

  ngOnInit() {

    this.fileService.getFiles().subscribe(res => {
      this.fileList = res;
      this.setPlayingFileSrc(this.fileList[0]._id);
    });

  }


  onFileClicked(file: File) {
    console.log(file);
    this.setPlayingFileSrc(file._id);
  }


  setPlayingFileSrc (id) {
    this.playingFileSrc = this.fileService.FILE_URL + id;
  }


}
