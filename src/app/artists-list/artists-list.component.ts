import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Artist } from '../objects';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.css']
})
export class ArtistsListComponent implements OnInit {

  @Input() artists: Artist[];
  @Output() onEdit: EventEmitter<Artist> = new EventEmitter();
  @Output() onDelete: EventEmitter<Artist> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditArtist(artist) {
    this.onEdit.emit(artist);
  }

  onDeleteArtist(artist) {
    this.onDelete.emit(artist);
  }

}
