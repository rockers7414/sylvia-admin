import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMgrPageComponent } from './artist-mgr-page.component';

describe('ArtistMgrPageComponent', () => {
  let component: ArtistMgrPageComponent;
  let fixture: ComponentFixture<ArtistMgrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistMgrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistMgrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
