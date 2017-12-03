import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLyricModalComponent } from './track-lyric-modal.component';

describe('TrackLyricModalComponent', () => {
  let component: TrackLyricModalComponent;
  let fixture: ComponentFixture<TrackLyricModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackLyricModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLyricModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
