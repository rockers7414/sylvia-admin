import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEditFormComponent } from './artist-edit-form.component';

describe('ArtistEditFormComponent', () => {
  let component: ArtistEditFormComponent;
  let fixture: ComponentFixture<ArtistEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
