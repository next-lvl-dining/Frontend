import { Component, OnInit } from '@angular/core';
import { MonitoringService } from '../../services/monitoring/monitoring.service';
import { Monitoring } from '../../models/monitoring';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  baseUrl = 'http://localhost';

  backends: Monitoring[] = [
    { name: 'Reserve', url: `${this.baseUrl}:8080`, status: true },
    { name: 'Logging', url: `${this.baseUrl}:8082`, status: false },
    { name: 'Login', url: `${this.baseUrl}:8083`, status: false },
    { name: 'Order', url: `${this.baseUrl}:8084`, status: true },
    { name: 'Payment', url: `${this.baseUrl}:8085`, status: true },
    { name: 'Promotion', url: `${this.baseUrl}:8086`, status: false },
    { name: 'Deliver', url: `${this.baseUrl}:8088`, status: false },
  ];

  constructor(private monitoringService: MonitoringService) {
  }

  ngOnInit() {
    this.backends.forEach((backend) => {
      // Commented until backend is working
      // this.monitoringService.ping(backend.url).subscribe(data => backend.status = data, error => { });
    });
  }

}
