import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEditFormComponent } from './track-edit-form.component';

describe('TrackEditFormComponent', () => {
  let component: TrackEditFormComponent;
  let fixture: ComponentFixture<TrackEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
