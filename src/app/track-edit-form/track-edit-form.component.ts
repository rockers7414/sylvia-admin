import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MetadataService } from '../services/metadata.service';

import { Track } from '../objects';

@Component({
  selector: 'app-track-edit-form',
  templateUrl: './track-edit-form.component.html',
  styleUrls: ['./track-edit-form.component.css']
})
export class TrackEditFormComponent implements OnInit, OnChanges {

  @Input() editTrack: Track;
  @Output() onAdded: EventEmitter<Track> = new EventEmitter();
  @Output() onCanceled: EventEmitter<null> = new EventEmitter();
  @Output() onEditedTrack: EventEmitter<Track> = new EventEmitter();

  private form: FormGroup;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.form = new FormGroup({
      trackNumber: new FormControl(this.editTrack ? this.editTrack.trackNumber : '', [Validators.required, Validators.min(1)]),
      name: new FormControl(this.editTrack ? this.editTrack.name : '', [Validators.required]),
      lyric: new FormControl(this.editTrack ? this.editTrack.lyric : '')
    });
  }

  onSubmit() {
    const track = new Track();
    track.trackNumber = this.form.value.trackNumber;
    track.name = this.form.value.name;
    track.lyric = this.form.value.lyric;
    this.metadataSvc.addTrack(track).subscribe(result => {
      this.onAdded.emit(result);
      this.form.reset();
    });
  }

  onSave() {
    const track = new Track();
    track._id = this.editTrack._id;
    track.trackNumber = this.form.value.trackNumber;
    track.name = this.form.value.name;
    track.lyric = this.form.value.lyric;
    this.metadataSvc.updateTrack(track).subscribe(result => {
      this.onEditedTrack.emit(track);
      this.editTrack = null;
      this.form.reset();
    });
  }

  onCancel() {
    this.editTrack = null;
    this.form.reset();
    this.onCanceled.emit();
  }

}
