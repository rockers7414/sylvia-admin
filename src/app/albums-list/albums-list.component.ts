import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Album } from '../objects';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  @Input() albums: Album[];
  @Output() onEdit: EventEmitter<Album> = new EventEmitter();
  @Output() onDelete: EventEmitter<Album> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditAlbum(album) {
    this.onEdit.emit(album);
  }

  onDeleteAlbum(album) {
    this.onDelete.emit(album);
  }

}
