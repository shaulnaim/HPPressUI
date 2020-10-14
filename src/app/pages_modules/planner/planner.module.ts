import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPlannerApiModule } from 'app-planner-api';
import { HpUiElementsModule } from 'hp-ui-elements';
import { PlannerPageComponent } from './planner-page.component';
import { SlotsListComponent } from './components/slots-list/slots-list.component';
import { SlotComponent } from './components/slot/slot.component';
import { ReplaceInksComponent } from './components/replace-inks/replace-inks.component';
import { JobHeaderComponent } from './components/job-header/job-header.component';

@NgModule({
  declarations: [
    PlannerPageComponent,
    SlotsListComponent,
    SlotComponent,
    ReplaceInksComponent,
    JobHeaderComponent
  ],
  imports: [CommonModule, FormsModule, HpUiElementsModule, AppPlannerApiModule],
  exports: [PlannerPageComponent, SlotComponent]
})
export class PlannerModule {}
