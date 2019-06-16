import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayReservationsComponent } from './day-reservations.component';

describe('DayReservationsComponent', () => {
  let component: DayReservationsComponent;
  let fixture: ComponentFixture<DayReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
