import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Track } from '../objects';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.css']
})
export class TracksListComponent implements OnInit {

  @Input() tracks: Track[];
  @Output() onEditTrack: EventEmitter<Track> = new EventEmitter();
  @Output() onDeleteTrack: EventEmitter<Track> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
