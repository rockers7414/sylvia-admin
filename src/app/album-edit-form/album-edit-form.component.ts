import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MetadataService } from '../services/metadata.service';

import { Album } from '../objects';

@Component({
  selector: 'app-album-edit-form',
  templateUrl: './album-edit-form.component.html',
  styleUrls: ['./album-edit-form.component.css']
})
export class AlbumEditFormComponent implements OnInit, OnChanges {

  @Input() editAlbum: Album;
  @Output() onAdded: EventEmitter<Album> = new EventEmitter();
  @Output() onEdited: EventEmitter<Album> = new EventEmitter();
  @Output() onCanceled: EventEmitter<null> = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private metadataSvc: MetadataService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.editAlbum ? this.editAlbum.name : '', [Validators.required]]
    });
  }

  ngOnChanges() {
    this.form = this.fb.group({
      name: [this.editAlbum ? this.editAlbum.name : '', [Validators.required]]
    });
  }

  onSubmit() {
    const album = new Album();
    album.name = this.form.value.name;
    this.metadataSvc.addAlbum(album).subscribe(result => {
      this.onAdded.emit(result);
      this.form.reset();
    });
  }

  onSave() {
    const album = new Album();
    album._id = this.editAlbum._id;
    album.name = this.form.value.name;
    this.metadataSvc.updateAlbum(album).subscribe(result => {
      this.onEdited.emit(result);
      this.editAlbum = null;
      this.form.reset();
    });
  }

  onCancel() {
    this.editAlbum = null;
    this.form.reset();
    this.onCanceled.emit();
  }

}
