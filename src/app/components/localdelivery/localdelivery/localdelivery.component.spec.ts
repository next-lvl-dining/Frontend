import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaldeliveryComponent } from './localdelivery.component';

describe('LocaldeliveryComponent', () => {
  let component: LocaldeliveryComponent;
  let fixture: ComponentFixture<LocaldeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaldeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaldeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
