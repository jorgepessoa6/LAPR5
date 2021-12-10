import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DriverComponent} from './Drivers/drivers.component';
import { LineComponent } from './line/line.component';
import { NodeComponent} from './node/node.component';
import { PathComponent} from './path/path.component';
import { MessagesComponent } from './messages/messages.component';
import { VehicleTypeComponent } from './vehicleType/vehicleType.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ImportComponent } from './import/import.component';
import { MapaComponent } from './mapa/mapa.component';
import { TripResultComponent } from './tripResult/tripResult.component';
import { TripComponent } from './trip/trip.component';
import { VehicleDutyComponent } from './vehicleDuty/vehicleDuty.component';
import { DefineDriverComponent } from './defineDriver/defineDriver.component';
import { WorkBlockComponent} from './workBlock/workBlock.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AccountHomeComponent } from './account-home/account-home.component';

import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { GenerationsComponent } from './generations/generations.component';
import { DriverDutyComponent } from './driverDuty/driverDuty.component';
import {Location} from '@angular/common';  
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),         
    ReactiveFormsModule
    ],   
  declarations: [
    AppComponent,
    DriverComponent,
    NodeComponent,
    MessagesComponent,
    ImportComponent,
    LineComponent,
    PathComponent,
    VehicleComponent,
    VehicleTypeComponent,
    TripResultComponent,
    MapaComponent,
    TripComponent,
    VehicleDutyComponent,
    DefineDriverComponent,
    WorkBlockComponent,
    AdminHomeComponent,
    NavMenuComponent,
    DriverDutyComponent,
    LoginComponent,
    AccountHomeComponent,
    UserHomeComponent,
    GenerationsComponent
  ],providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],   
    bootstrap: [AppComponent] 
})
export class AppModule { }
