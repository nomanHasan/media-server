import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { File } from '../models/file.model';
import { DefaultPlayerState } from '../player/player-state.interface';

@Component({ selector: 'fex-filex', templateUrl: './filex.component.html', styleUrls: ['./filex.component.scss'] })
export class FilexComponent implements OnInit {

  constructor(private fileService: FileService) { }

  fileList: File[];
  selectedFile: File;

  playerState = DefaultPlayerState;

  previousIndexes: number[] = [];

  ngOnInit() {

    this
      .fileService
      .getFiles()
      .subscribe(res => {
        this.fileList = res;
        this.selectedFile = this.shuffleNext();
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

  skipPrevious(event) {
    let index = this
      .fileList
      .indexOf(this.selectedFile);

    index -= 1;

    if (this.previousIndexes.length > 0) {
      this.selectedFile = this.fileList[this.previousIndexes[this.previousIndexes.length - 1]];
    } else {
      this.selectedFile = this.fileList[index];
    }

    console.log(index, this.previousIndexes, this.selectedFile);

    this.setPlayingFileSrc(this.selectedFile._id);
  }

  shuffleNext() {
    const rand = Math.floor(Math.random() * this.fileList.length + 1);

    if (this.previousIndexes.length > 20) {
      this.previousIndexes.push(rand);
      this.previousIndexes = this.previousIndexes.slice(this.previousIndexes.length - 21, this.previousIndexes.length - 1);
    } else {
      this.previousIndexes.push(rand);
    }


    console.log(this.previousIndexes, this.previousIndexes.slice(this.previousIndexes.length - 21, this.previousIndexes.length - 1));

    return this.fileList[rand];
  }

  onStateChanged(event) {
    this.playerState = event;
  }

}
