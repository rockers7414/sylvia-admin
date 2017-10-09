import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MetadataService } from '../services/metadata.service';

import { Artist } from '../objects';

@Component({
  selector: 'app-artist-edit-form',
  templateUrl: './artist-edit-form.component.html',
  styleUrls: ['./artist-edit-form.component.css']
})
export class ArtistEditFormComponent implements OnInit {

  @Output() onAdd: EventEmitter<Artist> = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private metadataSvc: MetadataService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const artist = new Artist();
    artist.name = this.form.get('name').value;
    this.metadataSvc.addArtist(artist).subscribe(result => {
      this.onAdd.emit(result);
      this.form.reset();
    });
  }

}
