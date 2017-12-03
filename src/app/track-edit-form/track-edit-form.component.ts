import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MetadataService } from '../services/metadata.service';

import { Track } from '../objects';

@Component({
  selector: 'app-track-edit-form',
  templateUrl: './track-edit-form.component.html',
  styleUrls: ['./track-edit-form.component.css']
})
export class TrackEditFormComponent implements OnInit {

  @Input() editTrack: Track;
  @Output() onAdded: EventEmitter<Track> = new EventEmitter();

  private form: FormGroup;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
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

}
