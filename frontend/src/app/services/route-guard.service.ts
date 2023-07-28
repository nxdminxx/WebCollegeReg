import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth:AuthService,
    public router:Router,
    private snackbarService:SnackbarService) { }

    canActivate(route:ActivatedRouteSnapshot):boolean{
      let expectedRoleArray = route.data;
      expectedRoleArray= expectedRoleArray.expectedRole;

      const token:any = localStorage.getItem('token');
      var tokenPayload:any;
      try{
        var tokenPayload = jwt_decode(token);
      }
      catch(err){
        localStorage.clear();
        this.router.navigate(['/']);
      }
     
    }
}
