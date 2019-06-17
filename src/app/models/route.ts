import { XLocation } from './xlocation';

export class Route {
    startLocation : XLocation;
    endLocation : XLocation;

    constructor(startLocation : XLocation, endLocation : XLocation) {
        this.startLocation = startLocation;
        this.endLocation = endLocation;
    }
}