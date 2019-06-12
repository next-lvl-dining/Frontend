import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate, DatePipe } from '@angular/common';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { TimeSlot } from 'src/app/models/timeslot';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  today = new Date().toJSON().split('T')[0];

  constructor(private reservationService: ReservationService, private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      diningType: ['lunch', Validators.required],
      numberOfPeople: [2, [Validators.required, Validators.min(1)]],
      date: [, Validators.required],
      courseType: ['single'],
      diningTime: ['early']
    });
  }

  ngOnInit() {
  }

  onDinerTypeChange(type: string) {
    if (type === 'lunch') {
      this.renderer.addClass(document.getElementsByClassName('diningOptions')[0], 'invisible');
    } else if (type === 'diner') {
      this.renderer.removeClass(document.getElementsByClassName('invisible')[0], 'invisible');
    }
  }

  onCourseTypeChange(type: string) {
    if (type === 'single') {
      this.renderer.removeClass(document.getElementsByClassName('diningTime')[0], 'invisible');
    } else if (type === 'multi') {
      this.renderer.addClass(document.getElementsByClassName('diningTime')[0], 'invisible');
    }
  }

  onSubmit() {
    this.submitted = true;

    if (localStorage.getItem('id') == null) {
      alert('Log in to create a reservation');
      return;
    }

    if (this.messageForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const timeslot: TimeSlot[] = [];
    const date = new Date(this.messageForm.value.date);
    // Create timeslot for specicif dining and course type
    if (this.messageForm.value.diningType === 'lunch') {
      // Lunch starts at 12:30 ends at 15:00
      timeslot.push(this.createTimeSlot(date, 12, 30, 15, 0));
    } else if (this.messageForm.value.diningType === 'diner') {
      if (this.messageForm.value.courseType === 'single') {
        if (this.messageForm.value.diningTime === 'early') {
          // Early dinner starts at 17:00 ends at 20:00
          timeslot.push(this.createTimeSlot(date, 17, 30, 20, 0));
        } else if (this.messageForm.value.diningTime === 'late') {
          // Late dinner starts at 20:00 ends at 22:30
          timeslot.push(this.createTimeSlot(date, 20, 0, 22, 30));
        }
      } else if (this.messageForm.value.courseType === 'multi') {
        // Multicourse needs two timeslots
        timeslot.push(this.createTimeSlot(date, 17, 30, 20, 0));
        timeslot.push(this.createTimeSlot(date, 20, 0, 22, 30));
      }
    }

    const reservation: Reservation = {
      userID: localStorage.getItem('id'),
      nrofPeople: this.messageForm.value.numberOfPeople,
      date: new Date(this.messageForm.value.date),
      timeSlots: timeslot
    };

    this.reservationService.createReservation(reservation).subscribe(
      data => {
        alert('Reservation is made');
      },
      error => { console.log(error); });
  }

  createTimeSlot(date: Date, startHour: number, startMinutes: number, endHour: number, endMinutes: number): TimeSlot {
    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setHours(startHour);
    startDate.setMinutes(startMinutes);
    endDate.setHours(endHour);
    endDate.setMinutes(endMinutes);
    return new TimeSlot(startDate, endDate);
  }
}
