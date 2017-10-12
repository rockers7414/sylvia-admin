import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumEditPageComponent } from './album-edit-page.component';

describe('AlbumEditPageComponent', () => {
  let component: AlbumEditPageComponent;
  let fixture: ComponentFixture<AlbumEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
