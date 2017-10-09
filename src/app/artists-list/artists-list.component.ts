import { Component, OnInit, Input } from '@angular/core';

import { Artist } from '../objects';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.css']
})
export class ArtistsListComponent implements OnInit {

  @Input() artists: Artist[];

  constructor() { }

  ngOnInit() {
  }

}
