const baseUrl = '192.168.24.113';

export const environment = {
  production: true,

  LOGGING_API_URL: `http://${baseUrl}:8082/logging/api`,
  LOGIN_API_URL: `http://${baseUrl}:8083/login/api`,
  PAYMENT_API_URL: `http://${baseUrl}:8085/payment/api`,
  PROMOTION_API_URL: `http://${baseUrl}:8086/promotion/api`,
  DELIVER_API_URL: `http://${baseUrl}:8088/deliver/api`,
  RESERVE_API_URL: `http://${baseUrl}:8080/reserve/api`,
  ORDER_API_URL: `http://${baseUrl}:8084/order/api`
};
