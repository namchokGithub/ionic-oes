import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisPage } from './regis.page';

describe('RegisPage', () => {
  let component: RegisPage;
  let fixture: ComponentFixture<RegisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
