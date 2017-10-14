import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Track } from '../objects';

@Component({
  selector: 'app-track-edit-form',
  templateUrl: './track-edit-form.component.html',
  styleUrls: ['./track-edit-form.component.css']
})
export class TrackEditFormComponent implements OnInit {

  @Input() editTrack: Track;
  @Output() onEdited: EventEmitter<Track> = new EventEmitter();
  @Output() onCanceled: EventEmitter<Track> = new EventEmitter();
  @Output() onAdded: EventEmitter<Track> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
