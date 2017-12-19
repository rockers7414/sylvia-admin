import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { MetadataService } from '../services/metadata.service';

import { Track, Album, LiveSearchTemplate } from '../objects';

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

  /** live search */
  private searchAlbums$: Observable<Album[]>;
  private searchTerms = new Subject<string>();
  private composeTemplate: Function;

  private relateAlbum: Album;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    this.composeTemplate = this.templateCallback.bind(this);

    this.searchAlbums$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.metadataSvc.getAlbumByKeyword(term))
    );
  }

  ngOnChanges() {
    this.form = new FormGroup({
      trackNumber: new FormControl(this.editTrack ? this.editTrack.trackNumber : '', [Validators.required, Validators.min(1)]),
      name: new FormControl(this.editTrack ? this.editTrack.name : '', [Validators.required]),
      link: new FormControl(this.editTrack ? this.editTrack.link : ''),
      lyric: new FormControl(this.editTrack ? this.editTrack.lyric : ''),
      album: new FormControl({
          value: this.editTrack ? this.editTrack.album.name : '',
          disabled: true
      })
    });
  }

  onSubmit() {
    const track = new Track();
    track.trackNumber = this.form.value.trackNumber;
    track.name = this.form.value.name;
    track.link = this.form.value.link;
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
    track.link = this.form.value.link;
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

  onSearch(keyword) {
    var _keyword = (keyword == null || keyword == '') ? null : keyword;
    this.searchTerms.next(_keyword);
  }

  onRelateAlbum(album) {
    this.relateAlbum = album;
    var inputValue = album.title + (album.desc == '' ? '' : ' - ' + album.desc);
    this.form.controls['album'].setValue(inputValue);
  }

  templateCallback(object: any) {
    var templateArray = [];
    object.forEach(obj => {
      var template = new LiveSearchTemplate();
      template.obj = obj;
      template.title = obj.name;
      template.desc = obj.artist ? obj.artist.name : '';
      templateArray.push(template);
    });
    return templateArray;
  }
}
