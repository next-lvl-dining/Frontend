import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OrderComponent} from './components/order/order.component';
import {LoginComponent} from './components/login/login.component';
import {RoleComponent} from './components/role/role.component';
import {CartComponent} from './components/cart/cart.component';
import {HistoryComponent} from './components/history/history.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {CouponComponent} from './components/coupon/coupon.component';
import {PortalComponent} from './components/portal/portal.component';
import {NewProductComponent} from './components/new-product/new-product.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'order', component: OrderComponent},
    {path: 'role', component: RoleComponent},
    {path: 'coupon', component: CouponComponent},
    {path: 'cart', component: CartComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'reservation', component: ReservationComponent},
    {path: 'portal', component: PortalComponent},
    {path: 'product/add', component: NewProductComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
