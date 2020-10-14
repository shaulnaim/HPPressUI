import { CommonModule } from '@angular/common';
import { HpUiElementsModule } from 'hp-ui-elements';
import { BlPressControlApiModule } from 'press-control-api';
import { BlPaperHandlingApiModule } from 'paper-handling-api';
import { InspectionModule } from 'inspection-page';
import { MonitorModule } from 'monitor-page';
import { PlannerModule } from 'planner-page';
import { MainControllerModule } from 'main-controller';
import { RouterModule } from '@angular/router';

export const HOME_IMPORTED_MODULES = [
  CommonModule,
  RouterModule,
  BlPressControlApiModule,
  BlPaperHandlingApiModule,
  HpUiElementsModule,
  InspectionModule,
  MonitorModule,
  PlannerModule,
  MainControllerModule
];
