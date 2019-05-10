import { TimeSlot } from './timeslot';

export class Reservation {
  userID: string;
  nrofPeople: number;
  date: Date;
  timeSlots: TimeSlot[];
}
