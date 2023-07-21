import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageProductComponent } from './manage-product/manage-product.component';



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
        canActivate:[RouteGuardService]
        data:{
            expectRole:['admin']
        }

    }
];
