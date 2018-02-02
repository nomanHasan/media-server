import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { GestureConfig, MatInputModule, MatTabsModule, MatExpansionModule, MatCardModule } from '@angular/material';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatSliderModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { PlayerComponent } from './player/player.component';
import { FilexComponent } from './filex/filex.component';
import { HttpClientModule } from '@angular/common/http';
import { MediaService } from './services/media.service';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PlaylistComponent } from './playlist/playlist.component';


@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    PlayerComponent,
    FilexComponent,
    SidenavComponent,
    SearchBarComponent,
    PlaylistComponent
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
    MatSliderModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [
    MediaService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
