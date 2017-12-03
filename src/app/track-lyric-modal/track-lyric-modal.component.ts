import { Component, Input } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-track-lyric-modal',
  templateUrl: './track-lyric-modal.component.html',
  styleUrls: ['./track-lyric-modal.component.css']
})
export class TrackLyricModalComponent {

  @Input() name: string;
  @Input() trackNumber: number;
  @Input() lyric: string;

  constructor(public activeModal: NgbActiveModal) { }
}
