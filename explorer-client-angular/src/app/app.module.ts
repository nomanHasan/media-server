import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { GestureConfig } from '@angular/material';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatSliderModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { PlayerComponent } from './player/player.component';
import { FilexComponent } from './filex/filex.component';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from './services/file.service';
import { FormsModule } from '@angular/forms';


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
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule
  ],
  providers: [
    FileService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
