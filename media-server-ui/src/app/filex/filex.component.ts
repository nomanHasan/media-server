import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { File } from '../models/file.model';
import { DefaultPlayerState } from './player/player-state.interface';
import * as Fuse from 'fuse.js';

@Component({ selector: 'ms-filex', templateUrl: './filex.component.html', styleUrls: ['./filex.component.scss'] })
export class FilexComponent implements OnInit {

  constructor(private mediaService: MediaService) { }

  fileList: File[];
  fileListName = 'Unknown';
  selectedFile: File;

  playerState = DefaultPlayerState;

  previousIndexes: number[] = [];

  options;
  fuse;
  sidenavOpen = true;

  folderData: any = {};

  ngOnInit() {

    this
      .mediaService
      .getTracks()
      .subscribe(res => {
        console.log(res);
        this.setPlayList(res.docs);

      });

    this.options = {
      shouldSort: true,
      threshold: 1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'path']
    };

    this.mediaService.getRootFolder().subscribe(res => {
      this.folderData = res;
      console.log(this.folderData);
    });

  }

  setPlayList(list, name = 'Unknown') {

    if (list.length <= 0) {
      return;
    }

    this.fileList = list;
    this.fileListName = name;
    this.selectedFile = this.shuffleNext();
    this.setPlayingFileSrc(this.selectedFile._id);

    this.fuse = new Fuse(this.fileList, this.options);
  }

  onFileClicked(file: File) {
    this.selectedFile = file;
    this.setPlayingFileSrc(file._id);
  }

  setPlayingFileSrc(id) {
    this.selectedFile.src = this.mediaService.FILE_URL + id;
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
    // debugger;
    const rand = Math.floor(Math.random() * this.fileList.length);

    if (this.previousIndexes.length > 20) {
      this
        .previousIndexes
        .push(rand);
      this.previousIndexes = this
        .previousIndexes
        .slice(this.previousIndexes.length - 21, this.previousIndexes.length - 1);
    } else {
      this
        .previousIndexes
        .push(rand);
    }

    // console.log(this.previousIndexes,
    // this.previousIndexes.slice(this.previousIndexes.length - 21,
    // this.previousIndexes.length - 1));

    return this.fileList[rand];
  }

  onStateChanged(event) {
    this.playerState = event;
  }

  onFileSeach(event) {
    if (event.length > 0) {
      this.fileList = this
        .fuse
        .search(event);
    }
  }

  onFolderClicked(event) {
    this
      .mediaService
      .getTrackBySingleQuery(event)
      .subscribe(res => {
        this.folderData.list = res.docs;
        this.folderData.name = event.value;
        this.folderData.field = event.field;
      });
  }

  onFolderAction(event) {
    console.log(event);
    switch (event.type) {
      case 'play-folder': {
        this.setPlayList(event.data.files, event.data.name);
        break;
      }
      case 'play-folder-all': {

        this.mediaService.getFolderAllById(event.data._id).subscribe(res => {
          this.setPlayList(res.files);
        });
        break;
      }
      case 'play-list': {
        this
          .mediaService
          .getTrackBySingleQuery({ field: event.data.field, value: event.data.name[0] })
          .subscribe(res => {
            this.setPlayList(res.docs);
          });
        break;
      }
      case 'play-item': {
        this.setPlayList([event.data]);
      }
    }
  }

}
