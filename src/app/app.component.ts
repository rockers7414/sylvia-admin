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

}
