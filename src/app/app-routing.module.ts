import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import {HistoryComponent} from './components/history/history.component';
import {CheckoutComponent} from './components/checkout/checkout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
