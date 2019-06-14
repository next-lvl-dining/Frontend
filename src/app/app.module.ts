import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RoleComponent } from './components/role/role.component';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './services/auth/token.interceptor';
import { ProductService } from './services/product/product.service';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistorySearchComponent } from './components/history-search/history-search.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { HeaderComponent } from './components/header/header.component';
import { PortalComponent } from './components/portal/portal.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeUserComponent } from './components/home-user/home-user/home-user.component';
import { HomeAdminComponent } from './components/home-admin/home-admin/home-admin.component';
import { HomeEmployeeComponent } from './components/home-employee/home-employee/home-employee.component';
import { HomeTableComponent } from './components/home-table/home-table/home-table.component';
import { LocaldeliveryComponent } from './components/localdelivery/localdelivery/localdelivery.component';
import { PaidComponent } from './components/paid/paid.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    LoginComponent,
    RoleComponent,
    CartComponent,
    HistoryComponent,
    DashboardComponent,
    HistorySearchComponent,
    OrderDetailComponent,
    CheckoutComponent,
    ReservationComponent,
    CouponComponent,
    HeaderComponent,
    PortalComponent,
    MonitoringComponent,
    ProductComponent,
    CategoryComponent,
    AdminComponent,
    ProfileComponent,
    HomeUserComponent,
    HomeAdminComponent,
    HomeEmployeeComponent,
    HomeTableComponent,
    LocaldeliveryComponent,
    PaidComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ProductService,
  { provide: 'LOGIN_API_URL', useValue: environment.LOGIN_API_URL },
  { provide: 'LOGGING_API_URL', useValue: environment.LOGGING_API_URL },
  { provide: 'PAYMENT_API_URL', useValue: environment.PAYMENT_API_URL },
  { provide: 'PROMOTION_API_URL', useValue: environment.PROMOTION_API_URL },
  { provide: 'DELIVER_API_URL', useValue: environment.DELIVER_API_URL },
  { provide: 'RESERVE_API_URL', useValue: environment.RESERVE_API_URL },
  { provide: 'ORDER_API_URL', useValue: environment.ORDER_API_URL }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
