import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMgrPageComponent } from './track-mgr-page.component';

describe('TrackMgrPageComponent', () => {
  let component: TrackMgrPageComponent;
  let fixture: ComponentFixture<TrackMgrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackMgrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMgrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
