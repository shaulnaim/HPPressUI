import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HpServicesModule } from 'hp-services';
import { FocusableDirective } from './directives/focusable.directive';
import { FormsModule } from '@angular/forms';
import { InlineEditInputComponent } from './inline-edit-controls/inline-edit-input/inline-edit-input.component';
import { HpWizardHostComponent } from './hp-wizard-host/hp-wizard-host.component';
import { ProcessAnimationComponent } from './process-animation/process-animation.component';
import { KebabCasePipe } from './pipes/kebab-case.pipe';
import { HpModalHostComponent } from './hp-modal-host/hp-modal-host.component';

@NgModule({
  imports: [CommonModule, HpServicesModule, FormsModule, DragDropModule],
  exports: [FocusableDirective, InlineEditInputComponent, HpWizardHostComponent, KebabCasePipe, ProcessAnimationComponent, HpModalHostComponent],
  declarations: [
    FocusableDirective,
    InlineEditInputComponent,
    HpWizardHostComponent,
    KebabCasePipe,
    ProcessAnimationComponent,
    HpModalHostComponent
  ]
})
export class HpUiElementsModule {}
