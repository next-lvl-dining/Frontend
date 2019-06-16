import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererMapComponent } from './deliverer-map.component';

describe('DelivererMapComponent', () => {
  let component: DelivererMapComponent;
  let fixture: ComponentFixture<DelivererMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelivererMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivererMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
