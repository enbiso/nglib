import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilsUrlComponent } from './utils-url.component';

describe('UtilsUrlComponent', () => {
  let component: UtilsUrlComponent;
  let fixture: ComponentFixture<UtilsUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilsUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilsUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
