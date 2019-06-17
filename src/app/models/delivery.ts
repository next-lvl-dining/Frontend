import { Route } from './route';

export class Delivery {
    deliveryId: String;
    employeeId: String;
    orderIdList: String[];
    routes: Route[];

    constructor(employeeId: String,orderIdList: String[],routes: Route[]){
        this.employeeId = employeeId;
        this.orderIdList = orderIdList;
        this.routes = routes;
    }
}