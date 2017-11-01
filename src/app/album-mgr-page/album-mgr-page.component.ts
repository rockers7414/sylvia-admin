import { Component, OnInit } from '@angular/core';

import { MetadataService } from '../services/metadata.service';

import { Album } from '../objects';

@Component({
  selector: 'app-album-mgr-page',
  templateUrl: './album-mgr-page.component.html',
  styleUrls: ['./album-mgr-page.component.css']
})
export class AlbumMgrPageComponent implements OnInit {

  isCollapsed = true;

  albums: Album[];
  editAlbum: Album;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    this.metadataSvc.getAlbums().subscribe(page => {
      this.albums = page.data;
    });
  }

  onEditAlbum(album) {
    this.editAlbum = album;
    this.isCollapsed = false;
  }

  onEditedAlbum(album) {
    const idx = this.albums.findIndex(a => a._id === album._id);
    this.albums.splice(idx, 1, album);
    this.isCollapsed = true;
  }

  onCanceledEditAlbum() {
    this.editAlbum = null;
    this.isCollapsed = true;
  }

  onAddedAlbum(album) {
    this.albums.splice(0, 0, album);
  }

  onDeleteAlbum(album) {
    this.metadataSvc.deleteAlbum(album).subscribe(result => {
      if (result) {
        this.albums = this.albums.filter(a => a !== album);
      }
    });
  }

}
