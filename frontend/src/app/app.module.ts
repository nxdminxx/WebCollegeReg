import { TokenIntercepterInterceptor } from './services/token-intercepter.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig ={ //spinner loader attribute
  text:"loading....",
  textColor:"#FFFFFF",
  textPosition: "center-center",
  pbColor:"red", //
  bgsColor:"red", //
  fgsColor:"red", //
  fgsType: SPINNER.ballSpinClockwise, //jenis loader (refer website)
  fgsSize:100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness:5
}


@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    BestSellerComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    SignupComponent,
    ForgotPasswordComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,  /*for http req or res*/
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),   // for spinner loader
    NgxSpinnerModule, // Add NgxSpinnerModule
  ],
  providers: [HttpClientModule, {provide:HTTP_INTERCEPTORS,useClass:TokenIntercepterInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
