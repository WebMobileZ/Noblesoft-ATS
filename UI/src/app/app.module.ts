import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {  ErrorInterceptor } from './admin/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { PerformanceComponent } from './admin/performance/performance.component';
import { CalculatorPageComponent } from './admin/calculatorpage/calculatorpage.component';
import { CalculatorDashComponent } from './admin/calculatorDash/calculatordash.component';

import { NotfoundComponent } from './errors/notfound/notfound.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule, InputUtilitiesModule, CheckboxModule, IconsModule } from 'angular-bootstrap-md';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CanUserAccessDirective } from './core/directives/can-user-access.directive';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,CanUserAccessDirective,ProfileComponent,PerformanceComponent,CalculatorPageComponent,CalculatorDashComponent

  ],

  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,RatingModule,TableModule,



    HttpClientModule,
    FormsModule,

    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [

     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


],

  bootstrap: [AppComponent]
})
export class AppModule { }
