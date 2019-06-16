import { TimeSlot } from './timeslot';
import { User } from './user';

export class Reservation {
  userID: string;
  nrofPeople: number;
  date: Date;
  timeSlots: TimeSlot[];
}

export class ReservationDTO {
  user: User;
  numberOfPeople: number;
  date: Date;
  type: DinnerType;
  time: string;
  diningTables: string[];
}

export enum DinnerType {
  MULTICOURSE = 'Multicourse',
  SINGLECOURSE = 'Singlecourse'
}
