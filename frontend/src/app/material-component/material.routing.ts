import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';



export const MaterialRoutes: Routes = [
    {
        path:'category',
        component:ManageCategoryComponent,
        canActive:[RouteGuardService],
        data:{
            expectRole:['admin']
        }

    },
    {
        path:'product',
        component:ManageProductComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin']
        }

    },
    {
        path:'order',
        component:ManageOrderComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin','user']
        }

    },
    {
        path:'bill',
        component:ViewBillComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin','user']
        }

    },
    {
        path:'user',
        component:ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
            expectRole:['admin']
        }

    }
];
