import { TestBed } from '@angular/core/testing';

import { Deliveryorderservice } from './deliveryorder.service';

describe('DeliveryorderserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Deliveryorderservice = TestBed.get(Deliveryorderservice);
    expect(service).toBeTruthy();
  });
});
