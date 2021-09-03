import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsStringComponent } from './utils-string.component';

describe('UtilsStringComponent', () => {
  let component: UtilsStringComponent;
  let fixture: ComponentFixture<UtilsStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilsStringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilsStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
