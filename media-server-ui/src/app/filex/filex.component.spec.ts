import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilexComponent } from './filex.component';

describe('FilexComponent', () => {
  let component: FilexComponent;
  let fixture: ComponentFixture<FilexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
