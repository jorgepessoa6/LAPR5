import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImportComponent } from './import/import.component';
import { DriverComponent } from './Drivers/drivers.component';
import { DefineDriverComponent } from './defineDriver/defineDriver.component';
import { NodeComponent } from './node/node.component';
import { LineComponent } from './line/line.component';
import { PathComponent } from './path/path.component';
import { MapaComponent } from './mapa/mapa.component';
import { TripResultComponent } from './tripResult/tripResult.component';
import { TripComponent } from './trip/trip.component'
import { WorkBlockComponent} from './workBlock/workBlock.component'
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleTypeComponent } from './vehicleType/vehicleType.component';
import { VehicleDutyComponent } from './vehicleDuty/vehicleDuty.component';
import { HomeComponent } from './home/home.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { GenerationsComponent } from './generations/generations.component';
import { DriverDutyComponent } from './driverDuty/driverDuty.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },    
  { path: 'login', component: LoginComponent },
  { path: 'generations', component: GenerationsComponent,canActivate: [AdminGuard] },
  { path: 'account', component: AccountHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },    
  { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard] },    
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard] },  
  { path: 'drivers', component: DriverComponent,canActivate: [AdminGuard]},
  { path: 'node', component: NodeComponent,canActivate: [AdminGuard]},
  { path: 'line', component: LineComponent,canActivate: [AdminGuard]},
  { path: 'defineDrivers', component: DefineDriverComponent,canActivate: [AdminGuard]},
  { path: 'path', component: PathComponent,canActivate: [AdminGuard]},
  { path: 'vehicle', component:VehicleComponent,canActivate: [AdminGuard]},
  { path: 'vehicleType', component:VehicleTypeComponent,canActivate: [AdminGuard]},
  { path: 'import', component: ImportComponent,canActivate: [AdminGuard]},
  { path: 'tripResult', component: TripResultComponent,canActivate: [AdminGuard]},
  { path: 'mapa', component: MapaComponent},
  { path: 'trip', component: TripComponent,canActivate: [AdminGuard]},
  { path: 'workBlock', component: WorkBlockComponent,canActivate: [AdminGuard]},
  { path: 'vehicleDuty', component: VehicleDutyComponent,canActivate: [AdminGuard]},
  { path: 'driverDuty', component: DriverDutyComponent,canActivate: [AdminGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false, initialNavigation: 'enabled' })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }