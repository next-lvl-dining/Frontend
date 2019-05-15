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
  { provide: 'API_URL', useValue: environment.API_URL },
  { provide: 'ORDER_API_URL', useValue: environment.ORDER_API_URL }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
