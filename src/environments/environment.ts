// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseUrl = '192.168.24.110';

export const environment = {
  production: false,

  LOGGING_API_URL: `http://${baseUrl}:8082/logging/api`,
  LOGIN_API_URL: `http://${baseUrl}:8083/login/api`,
  PAYMENT_API_URL: `http://${baseUrl}:8085/payment/api`,
  PROMOTION_API_URL: `http://${baseUrl}:8086/promotion/api`,
  DELIVER_API_URL: `http://${baseUrl}:8088/deliver/api`,
  RESERVE_API_URL: `http://${baseUrl}:8080/reserve/api`,
  ORDER_API_URL: `http://${baseUrl}:8084/order/api`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
