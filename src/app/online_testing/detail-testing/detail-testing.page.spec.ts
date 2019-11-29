import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTestingPage } from './detail-testing.page';

describe('DetailTestingPage', () => {
  let component: DetailTestingPage;
  let fixture: ComponentFixture<DetailTestingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTestingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTestingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
