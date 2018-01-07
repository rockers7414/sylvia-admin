import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MetadataService } from '../services/metadata.service';

import { Album, Track, Artist } from '../objects';

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

  private form: FormGroup;

  private relateArtist: Artist;
  private relateTracks: Track[];

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    // this.form = this.fb.group({
    //   name: [this.editAlbum ? this.editAlbum.name : '', [Validators.required]]
    // });
  }

  ngOnChanges() {
    this.form = new FormGroup({
      name: new FormControl(this.editAlbum ? this.editAlbum.name : '', [Validators.required]),
      artist: new FormControl({
        value: this.editAlbum ? (this.editAlbum.artist ? this.editAlbum.artist.name : '') : '',
        disabled: true
      })
    });
      // TODO => images, tracks.

    if(this.editAlbum) {
      this.relateArtist = this.editAlbum.artist;
    }
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
