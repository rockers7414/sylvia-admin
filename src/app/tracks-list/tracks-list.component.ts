import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  open(track) {
    const modalRef = this.modalService.open(TrackLyricModalComponent);
    modalRef.componentInstance.trackNumber = track.trackNumber;
    modalRef.componentInstance.name = track.name;
    console.log(track.lyric)
    modalRef.componentInstance.lyric = track.lyric;
  }
}
