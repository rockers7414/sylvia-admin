import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MetadataService } from './services/metadata.service';

import { AppComponent } from './app.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { ArtistEditFormComponent } from './artist-edit-form/artist-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsListComponent,
    ArtistEditFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [
    MetadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
