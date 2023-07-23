import { SnackbarService } from './../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from './../services/dashboard.service';
import { Component, AfterViewInit } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
responseMessage: any;
data:any;
	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,
		private ngxService:NgxUiLoaderService,
		private snackbarService:SnackbarService) {
			this.ngxService.start();
			this.dashboardData();
	}
	dashboardData(){
		this.dashboardService.getDetails().subscribe((response:any) => {
			this.ngxService.stop();
			this.data = response;
			
		},(error:any) => {
			this.ngxService.stop();
			console.log(error);
			if(error.error?.Message){
				this.responseMessage = error.error?.Message;
			}else{
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);

		})
	}
}
