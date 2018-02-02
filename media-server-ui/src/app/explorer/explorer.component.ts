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

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  artists;
  albums;
  genres;

  constructor(
    private mediaService: MediaService
  ) { }

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


}
