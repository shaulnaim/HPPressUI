import { BrowserModule } from '@angular/platform-browser';

import { InspectionModule } from 'app/pages_modules/inspection';
import { HomeModule } from 'app/pages_modules/home';
import { MonitorModule } from 'app/pages_modules/monitor';
import { PlannerModule } from 'app/pages_modules/planner';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const APP_IMPORTED_MODULES = [
  BrowserModule,
  AppRoutingModule,
  InspectionModule,
  HomeModule,
  MonitorModule,
  PlannerModule,
  BrowserAnimationsModule
];
