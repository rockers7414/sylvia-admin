import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MetadataService } from './services/metadata.service';

import { AppComponent } from './app.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { ArtistEditFormComponent } from './artist-edit-form/artist-edit-form.component';
import { ArtistMgrPageComponent } from './artist-mgr-page/artist-mgr-page.component';

import { routing } from './app.routing';
import { AlbumMgrPageComponent } from './album-mgr-page/album-mgr-page.component';
import { AlbumEditFormComponent } from './album-edit-form/album-edit-form.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { TracksListComponent } from './tracks-list/tracks-list.component';
import { TrackEditFormComponent } from './track-edit-form/track-edit-form.component';
import { TrackMgrPageComponent } from './track-mgr-page/track-mgr-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsListComponent,
    ArtistEditFormComponent,
    ArtistMgrPageComponent,
    AlbumMgrPageComponent,
    AlbumEditFormComponent,
    AlbumsListComponent,
    TracksListComponent,
    TrackEditFormComponent,
    TrackMgrPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [
    MetadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
