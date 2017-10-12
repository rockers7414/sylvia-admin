import { Component, OnInit, Input } from '@angular/core';

import { Album } from '../objects';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {

  @Input() albums: Album[];

  constructor() { }

  ngOnInit() {
  }

}
