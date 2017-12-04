import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Track } from '../objects';
import { TrackLyricModalComponent } from '../track-lyric-modal/track-lyric-modal.component';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.css']
})
export class TracksListComponent implements OnInit {

  @Input() tracks: Track[];
  @Output() onEdit: EventEmitter<Track> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  open(track) {
    const modalRef = this.modalService.open(TrackLyricModalComponent);
    track.lyric = track.lyric.trim();
    modalRef.componentInstance.track = track;
  }

  onEditTrack(track) {
    this.onEdit.emit(track);
  }

}
