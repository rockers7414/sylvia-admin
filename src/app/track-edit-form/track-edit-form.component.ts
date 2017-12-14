import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { MetadataService } from '../services/metadata.service';

import { Track, Album } from '../objects';

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
  private searchAlbums$: Observable<Album[]>;
  private searchTerms = new Subject<string>();
  private liveSearchResult: Album[];
  private liveSearchResultShow = false;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    this.searchAlbums$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.metadataSvc.getAlbumByKeyword(term))
    );

    this.searchAlbums$.subscribe(result => {
      this.liveSearchResult = result;
      if(this.liveSearchResult.length > 0) {
        this.liveSearchResultShow = true;
      }
    });
  }

  ngOnChanges() {
    this.form = new FormGroup({
      trackNumber: new FormControl(this.editTrack ? this.editTrack.trackNumber : '', [Validators.required, Validators.min(1)]),
      name: new FormControl(this.editTrack ? this.editTrack.name : '', [Validators.required]),
      link: new FormControl(this.editTrack ? this.editTrack.link : ''),
      lyric: new FormControl(this.editTrack ? this.editTrack.lyric : ''),
      album: new FormControl({
          value: this.editTrack ? this.editTrack.album : '',
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

  onBlur() {
    this.liveSearchResultShow = false;
  }

  onFocus() {
    this.liveSearchResultShow = true;
  }

  onSearch(keyword) {
    var _keyword = null;
    if(keyword.target.value != '') {
      _keyword = keyword.target.value;
    }
    this.searchTerms.next(_keyword);
  }

}
