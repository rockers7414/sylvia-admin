import { Component, OnInit } from '@angular/core';

import { MetadataService } from './services/metadata.service';

import { Artist } from './objects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  artists: Artist[];

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    this.metadataSvc.getArtists().subscribe(page => {
      this.artists = page.data;
    });
  }

  onDeleteArtist(artist) {
    this.metadataSvc.deleteArtist(artist).subscribe(result => {
      if (result) {
        this.artists = this.artists.filter(a => a !== artist);
      }
      // TODO: error handle.
    });
  }

  onEditArtist(artist) {
    console.log(artist);
  }

  onAddArtist(artist) {
    this.artists.splice(0, 0, artist);
  }

}
