// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  LOGIN_API_URL: 'http://localhost:8083/login/api',
  PAYMENT_API_URL: 'http://localhost:8085/payment/api',
  PROMOTION_API_URL: 'http://localhost:8086/promotion/api',
  DELIVER_API_URL: 'http://localhost:8088/deliver/api',
  RESERVE_API_URL: 'http://localhost:8080/reserve/api',
  ORDER_API_URL: 'http://localhost:8084/order/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
