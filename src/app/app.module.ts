import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MetadataService } from './services/metadata.service';

import { AppComponent } from './app.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    MetadataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
