import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { PlayerComponent } from './player/player.component';
import { FilexComponent } from './filex/filex.component';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from './services/file.service';


@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    PlayerComponent,
    FilexComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
