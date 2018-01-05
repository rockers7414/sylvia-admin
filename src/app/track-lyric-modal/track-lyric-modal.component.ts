import { Component, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Track } from '../objects';

@Component({
  selector: 'app-track-lyric-modal',
  templateUrl: './track-lyric-modal.component.html',
  styleUrls: ['./track-lyric-modal.component.css']
})
export class TrackLyricModalComponent {

  @Input() track: Track;

  constructor(public activeModal: NgbActiveModal) { }
}
