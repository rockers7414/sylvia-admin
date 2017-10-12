import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMgrPageComponent } from './album-mgr-page.component';

describe('AlbumMgrPageComponent', () => {
  let component: AlbumMgrPageComponent;
  let fixture: ComponentFixture<AlbumMgrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumMgrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumMgrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
