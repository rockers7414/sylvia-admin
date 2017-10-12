import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MetadataService } from '../services/metadata.service';

import { Artist } from '../objects';

@Component({
  selector: 'app-artist-edit-form',
  templateUrl: './artist-edit-form.component.html',
  styleUrls: ['./artist-edit-form.component.css']
})
export class ArtistEditFormComponent implements OnInit, OnChanges {

  @Input() editArtist: Artist;
  @Output() onAdded: EventEmitter<Artist> = new EventEmitter();
  @Output() onEdited: EventEmitter<Artist> = new EventEmitter();
  @Output() onCanceled: EventEmitter<null> = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private metadataSvc: MetadataService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.form = this.fb.group({
      name: [this.editArtist ? this.editArtist.name : '', [Validators.required]]
    });
  }

  onSubmit() {
    const artist = new Artist();
    artist.name = this.form.get('name').value;
    this.metadataSvc.addArtist(artist).subscribe(result => {
      this.onAdded.emit(result);
      this.form.reset();
    });
  }

  onSave() {
    const artist = new Artist();
    artist._id = this.editArtist._id;
    artist.name = this.form.get('name').value;
    this.metadataSvc.updateArtist(artist).subscribe(result => {
      this.onEdited.emit(result);
      this.editArtist = null;
      this.form.reset();
    });
  }

  onCancel() {
    this.editArtist = null;
    this.form.reset();
    this.onCanceled.emit();
  }

}
