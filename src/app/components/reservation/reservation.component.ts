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
      numberOfPeople: [2, Validators.required],
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

    if (this.messageForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const timeslot: TimeSlot[] = [];
    const date = new Date(this.messageForm.value.date);
    //create timeslot for specicif dining and course type
    //lunch starts at 12:30 ends at 15:00
    if (this.messageForm.value.diningType === 'lunch') {
      timeslot.push(this.createTimeSlot(date, 12, 30, 15, 0));
    } else if (this.messageForm.value.diningType === 'diner') {
      if (this.messageForm.value.courseType === 'single') {
        //early dinner starts at 17:00 ends at 20:00
        if (this.messageForm.value.diningTime === 'early') {
          timeslot.push(this.createTimeSlot(date, 17, 30, 20, 0));
        }
        //late dinner starts at 20:00 ends at 22:30
        else if (this.messageForm.value.diningTime === 'late') {
          timeslot.push(this.createTimeSlot(date, 20, 0, 22, 30));
        }
      }
      //Multicourse needs two timeslots
      else if (this.messageForm.value.courseType === 'multi') {
        timeslot.push(this.createTimeSlot(date, 17, 30, 20, 0));
        timeslot.push(this.createTimeSlot(date, 20, 0, 22, 30));
      }
    }

    const reservation: Reservation = {
      userID: '1',
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
