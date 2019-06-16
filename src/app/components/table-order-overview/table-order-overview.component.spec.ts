import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrderOverviewComponent } from './table-order-overview.component';

describe('TableOrderOverviewComponent', () => {
  let component: TableOrderOverviewComponent;
  let fixture: ComponentFixture<TableOrderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOrderOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOrderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
