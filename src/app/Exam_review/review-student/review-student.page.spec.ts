import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStudentPage } from './review-student.page';

describe('ReviewStudentPage', () => {
  let component: ReviewStudentPage;
  let fixture: ComponentFixture<ReviewStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
