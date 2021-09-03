import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxRouteComponent } from './ngrx-route.component';

describe('NgrxRouteComponent', () => {
  let component: NgrxRouteComponent;
  let fixture: ComponentFixture<NgrxRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
