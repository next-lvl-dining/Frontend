import { Component, OnInit, Inject } from '@angular/core';
import { MonitoringService } from '../../services/monitoring/monitoring.service';
import { Monitoring } from '../../models/monitoring';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  backends: Monitoring[] = [
    { name: 'Reserve', url: this.RESERVE_API_URL, status: false },
    { name: 'Logging', url: this.LOGGING_API_URL, status: false },
    { name: 'Login', url: this.LOGIN_API_URL, status: false },
    { name: 'Order', url: this.ORDER_API_URL, status: false },
    { name: 'Payment', url: this.PAYMENT_API_URL, status: false },
    { name: 'Promotion', url: this.PROMOTION_API_URL, status: false },
    { name: 'Deliver', url: this.DELIVER_API_URL, status: false },
  ];

  constructor(
    private monitoringService: MonitoringService, @Inject('RESERVE_API_URL') private RESERVE_API_URL: string,
    @Inject('LOGGING_API_URL') private LOGGING_API_URL: string, @Inject('LOGIN_API_URL') private LOGIN_API_URL: string,
    @Inject('ORDER_API_URL') private ORDER_API_URL: string, @Inject('PAYMENT_API_URL') private PAYMENT_API_URL: string,
    @Inject('PROMOTION_API_URL') private PROMOTION_API_URL: string, @Inject('DELIVER_API_URL') private DELIVER_API_URL: string,
    private authService: AuthService, private router: Router
  ) {
  }

  ngOnInit() {
    if (!this.authService.hasRole('admin')) {
      alert('Login as admin to continue');
      this.router.navigateByUrl('/login');
    }
    this.backends.forEach((backend) => {
      // Commented until backend is working
      if (backend.url.indexOf('login') !== -1) {
        this.monitoringService.ping(backend.url + '/test').subscribe(data => backend.status = data, error => { });
      } else if (backend.url.indexOf('logging') !== -1) {
        this.monitoringService.ping(backend.url + '/health').subscribe(data => backend.status = data, error => { });
      } else {
        this.monitoringService.ping(backend.url + '/ping').subscribe(data => backend.status = data, error => { });
      }
    });
  }

}
