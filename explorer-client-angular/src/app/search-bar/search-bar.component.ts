import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({selector: 'fex-search-bar', template: `
  <mat-icon color="warn" aria-label="Search Icon">search</mat-icon>
  <mat-form-field>
    <input type="text" matInput [(ngModel)]="search" (keyup)="onSearchKeyUp($event)" >
  </mat-form-field>
  `, styles: [`

  mat-form-field{
    width: 90%;
  }


    `]})
export class SearchBarComponent implements OnInit {

  @Output() searched = new EventEmitter < any > ();

  searchStream: Subject < any > = new Subject < any > ();
  search;

  constructor() {}

  ngOnInit() {

    this
      .searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(val => {
        this
          .searched
          .emit(this.search);
      });

  }

  onSearchKeyUp(event) {
    this
      .searchStream
      .next(event);
  }

}
