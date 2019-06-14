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
import {ProductComponent} from './components/product/product.component';
import {CategoryComponent} from './components/category/category.component';
import {AdminComponent} from './components/admin/admin.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MonitoringComponent} from './components/monitoring/monitoring.component';
import {HomeAdminComponent} from './components/home-admin/home-admin/home-admin.component';
import {HomeEmployeeComponent} from './components/home-employee/home-employee/home-employee.component';
import {HomeUserComponent} from './components/home-user/home-user/home-user.component';
import {HomeTableComponent} from './components/home-table/home-table/home-table.component';
import {PaidComponent} from './components/paid/paid.component';

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
    {path: 'product', component: ProductComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'monitoring', component: MonitoringComponent},
    {path: 'home-admin', component: HomeAdminComponent},
    {path: 'home-table', component: HomeTableComponent},
    {path: 'home-user', component: HomeUserComponent},
    {path: 'home-employee', component: HomeEmployeeComponent},
    {path: 'paid', component: PaidComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
