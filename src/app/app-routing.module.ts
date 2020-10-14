import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'home-page';
import { PlannerPageComponent } from 'planner-page';
import { InspectionPageComponent } from 'inspection-page';
import { MonitorPageComponent } from 'monitor-page';
import { MainControllerComponent } from 'main-controller';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'planner', component: PlannerPageComponent },
  { path: 'inspection', component: InspectionPageComponent },
  { path: 'controller', component: MainControllerComponent },
  { path: 'monitor', component: MonitorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
