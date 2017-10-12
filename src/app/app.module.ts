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
import { AlbumEditPageComponent } from './album-edit-page/album-edit-page.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsListComponent,
    ArtistEditFormComponent,
    ArtistMgrPageComponent,
    AlbumMgrPageComponent,
    AlbumEditPageComponent,
    AlbumsListComponent
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
