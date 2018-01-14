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
  private albumLiveSearchResult;
  private liveSearchPlaceholder = "Search tracks...";

  private relateAlbum: Album;
  private originalAlbum: Album;

  constructor(private metadataSvc: MetadataService) { }

  ngOnInit() {
    this.searchAlbums$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.metadataSvc.getAlbumByKeyword(term))
    );

    this.searchAlbums$.subscribe(result => {
      this.albumLiveSearchResult = [];
      result.forEach(obj => {
        var template = new LiveSearchTemplate();
        template.obj = obj;
        template.title = obj.name;
        template.desc = obj.artist ? obj.artist.name : '';
        this.albumLiveSearchResult.push(template);
      });
    });
  }

  ngOnChanges() {
    this.form = new FormGroup({
      trackNumber: new FormControl(this.editTrack ? this.editTrack.trackNumber : '', [Validators.required, Validators.min(1)]),
      name: new FormControl(this.editTrack ? this.editTrack.name : '', [Validators.required]),
      link: new FormControl(this.editTrack ? this.editTrack.link : ''),
      lyric: new FormControl(this.editTrack ? this.editTrack.lyric : ''),
      album: new FormControl({
          value: this.editTrack ? (this.editTrack.album ? this.editTrack.album.name : '') : '',
          disabled: true
      })
    });

    if(this.editTrack) {
      this.relateAlbum = this.editTrack.album;
      this.originalAlbum = this.editTrack.album;
    }
  }

  onSubmit() {
    const track = new Track();
    track.trackNumber = this.form.value.trackNumber;
    track.name = this.form.value.name;
    track.link = this.form.value.link;
    track.lyric = this.form.value.lyric;

    this.metadataSvc.addTrack(track).subscribe(result => {
      this.onAdded.emit(result);

      /** Set album relationship */
      if(this.relateAlbum) {
        this.metadataSvc.addTrackToAlbum(this.relateAlbum._id, { 'tracks': [track._id] }).subscribe();
      }

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

      (async () => {
        if(this.originalAlbum) {
          await this.metadataSvc.removeTrackFromAlbum(this.originalAlbum._id, track._id).toPromise();
        }

        if(this.relateAlbum) {
          await this.metadataSvc.addTrackToAlbum(this.relateAlbum._id, { 'tracks': [track._id] }).toPromise().then(() => {
            track.album = this.relateAlbum;
          });
        }
      })();

      this.editTrack = null;
      this.form.reset();
    });
  }

  onCancel() {
    this.editTrack = null;
    this.relateAlbum = null;
    this.form.reset();
    this.onCanceled.emit();
  }

  onSearch(keyword) {
    var _keyword = (keyword == null || keyword == '') ? null : keyword;
    this.searchTerms.next(_keyword);
  }

  onRelateAlbum(templ: LiveSearchTemplate) {
    this.relateAlbum = <Album>templ.obj;
    var inputValue = templ.title + (templ.desc == '' ? '' : ' - ' + templ.desc);
    this.form.controls['album'].setValue(inputValue);
  }

  onRemoveRelateAlbum() {
    this.relateAlbum = null;
    this.form.controls['album'].setValue('');
    this.albumLiveSearchResult = null;
  }
}
