import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationDTO } from 'src/app/models/reservation';

@Component({
  selector: 'app-day-reservations',
  templateUrl: './day-reservations.component.html',
  styleUrls: ['./day-reservations.component.scss']
})
export class DayReservationsComponent implements OnInit {
  reservations: ReservationDTO[];
  today = new Date().toJSON().split('T')[0];
  messageForm: FormGroup;

  constructor(
    private authService: AuthService, private reservationService: ReservationService,
    private router: Router, private formBuilder: FormBuilder
  ) {
    this.messageForm = this.formBuilder.group({
      date: [this.today, Validators.required],
    });

    this.messageForm.valueChanges.subscribe(data =>
      this.getReservations(this.messageForm.value.date)
    );
  }

  ngOnInit() {
    if (!this.authService.hasRole('employee')) {
      alert('Login as employee to continue');
      this.router.navigateByUrl('/login');
    }
    this.getReservations(this.getDateString(new Date()));
  }

  getDateString(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const today = date.getFullYear() + '-' + (month) + '-' + (day);
    return today;
  }

  getReservations(date: string) {
    this.reservationService.getByDate(date).subscribe(
      data => this.reservations = data,
      error => console.log(error));
  }

}
