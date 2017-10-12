import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumEditFormComponent } from './album-edit-form.component';

describe('AlbumEditFormComponent', () => {
  let component: AlbumEditFormComponent;
  let fixture: ComponentFixture<AlbumEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
