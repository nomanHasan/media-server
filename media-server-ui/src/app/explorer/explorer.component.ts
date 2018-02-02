import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { File } from '../models/file.model';
import { ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MediaService } from '../services/media.service';



@Component({
  selector: 'ms-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  @Input() explorerPlaylist;

  artists;
  albums;
  genres;

  constructor(
    private mediaService: MediaService
  ) { }

  @Output() selected = new EventEmitter<any>();

  ngOnInit() {

    this.mediaService.getAlbums().subscribe(res => {
      this.albums = res.albums;
    });
    this.mediaService.getArtists().subscribe(res => {
      this.artists = res.artists;
    });
    this.mediaService.getGenres().subscribe(res => {
      this.genres = res.genres;
    });

  }

  onClick(field, value) {
    this.selected.emit({
      field: field,
      value: value
    });
  }

}
