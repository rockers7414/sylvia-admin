import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../services/metadata.service';
import { Track } from '../objects';

@Component({
  selector: 'app-track-mgr-page',
  templateUrl: './track-mgr-page.component.html',
  styleUrls: ['./track-mgr-page.component.css']
})
export class TrackMgrPageComponent implements OnInit {

  isCollapsed = false;

  tracks: Track[];
  editTrack: Track;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    this.metadataSvc.getTracks().subscribe(page => {
      this.tracks = page.data;
    });
  }

  onAddedTrack(track) {
    this.tracks.splice(0, 0, track);
  }

  onEditTrack(track) {
    this.editTrack = track;
    this.isCollapsed = true;
  }

  onEditedTrack(track) {
    const idx = this.tracks.findIndex(a => a._id === track._id);
    this.tracks.splice(idx, 1, track);
    this.isCollapsed = false;
  }

  onCanceled() {
    this.isCollapsed = false;
    this.editTrack = null;
  }

  onDeleted(track) {
    const idx = this.tracks.findIndex(a => a._id === track._id);
    this.tracks.splice(idx, 1);
  }

}
