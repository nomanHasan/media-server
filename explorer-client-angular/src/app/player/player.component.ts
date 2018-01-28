import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { File } from '../models/file.model';

@Component({
  selector: 'fex-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {


  @ViewChild('audio') audio: ElementRef;

  audioElement: HTMLMediaElement;

  @Input() src;
  @Input() state;

  constructor() { }

  ngOnInit() {
    this.audioElement = this.audio.nativeElement;

    this.audioElement.onloadedmetadata = e => {
      this.play();
    };
  }


  onPlayPauseClick(event) {
    if (!this.state.playing) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    this.state.playing = true;
    this.audioElement.play();
  }

  pause() {
    this.state.playing = false;
    this.audioElement.pause();
  }

  stop() {
    this.audioElement.pause();
  }

  skipNext(event) {

  }

  skipPrevious(event) {

  }

}
