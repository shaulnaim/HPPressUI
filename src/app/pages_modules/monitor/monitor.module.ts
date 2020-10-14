import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitorPageComponent } from './monitor-page.component';
import { IlsCalibrationComponent } from './components/ils-calibration/ils-calibration.component';
import { HpUiElementsModule } from 'hp-ui-elements';

@NgModule({
  declarations: [MonitorPageComponent, IlsCalibrationComponent],
  imports: [HpUiElementsModule, CommonModule, FormsModule],
  exports: [MonitorPageComponent]
})
export class MonitorModule {}
