import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {File} from '../models/file.model';
import {DefaultPlayerState} from '../player/player-state.interface';

@Component({selector: 'fex-filex', templateUrl: './filex.component.html', styleUrls: ['./filex.component.scss']})
export class FilexComponent implements OnInit {

  constructor(private fileService: FileService) {}

  fileList: File[];
  selectedFile: File;

  playerState = DefaultPlayerState;

  ngOnInit() {

    this
      .fileService
      .getFiles()
      .subscribe(res => {
        this.fileList = res;
        this.selectedFile = this.fileList[0];
        this.setPlayingFileSrc(this.selectedFile._id);
      });

  }

  onFileClicked(file: File) {
    this.selectedFile = file;
    this.setPlayingFileSrc(file._id);
  }

  setPlayingFileSrc(id) {
    this.selectedFile.src = this.fileService.FILE_URL + id;
  }

  skipNext(event) {
    let index = this
      .fileList
      .indexOf(this.selectedFile);

    if (this.playerState.shuffle) {
      this.selectedFile = this.shuffleNext();
    } else {
      this.selectedFile = this.fileList[++index];
    }

    this.setPlayingFileSrc(this.selectedFile._id);
  }

  skipPrevious(event) {}

  shuffleNext() {
    const rand = Math.floor(Math.random() * this.fileList.length + 1);
    return this.fileList[rand];
  }

  onStateChanged(event) {
    this.playerState = event;
  }

}
