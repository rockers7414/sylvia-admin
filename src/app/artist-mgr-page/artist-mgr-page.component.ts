import { Component, OnInit } from '@angular/core';

import { MetadataService } from '../services/metadata.service';

import { Artist } from '../objects';

@Component({
  selector: 'app-artist-mgr-page',
  templateUrl: './artist-mgr-page.component.html',
  styleUrls: ['./artist-mgr-page.component.css']
})
export class ArtistMgrPageComponent implements OnInit {

  isCollapsed = true;

  artists: Artist[];
  editArtist: Artist;

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
    this.editArtist = artist;
    this.isCollapsed = false;
  }

  onEditedArtist(artist) {
    const idx = this.artists.findIndex(a => a._id === artist._id);
    this.artists.splice(idx, 1, artist);
    this.isCollapsed = true;
  }

  onCanceledEditArtist() {
    this.editArtist = null;
    this.isCollapsed = true;
  }

  onAddedArtist(artist) {
    this.artists.splice(0, 0, artist);
  }

}
