import { SimpleChange } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PlannerSlotEntity, PlannerSlotEntityModel } from 'app-planner-api';
import { InlineEditInputComponent } from 'hp-ui-elements';
import { JobHeaderComponent } from './job-header.component';

describe('JobHeaderComponent suit', () => {
  let spectator: Spectator<JobHeaderComponent>;
  const createComponent: () => Spectator<JobHeaderComponent> = createComponentFactory({
    component: JobHeaderComponent,
    detectChanges: false,
    imports: [FormsModule],
    mocks: [PlannerSlotEntityModel],
    declarations: [InlineEditInputComponent]
  });

  function generateDefaultPlannerSlotEntity(): PlannerSlotEntity {
    return new PlannerSlotEntity();
  }

  const defaultEntity = generateDefaultPlannerSlotEntity();
  beforeEach(() => {
    spectator = createComponent();
    spectator.component.ngOnChanges({
      entity: new SimpleChange(null, defaultEntity, null)
    });
    spectator.setInput('entity', defaultEntity);
    spectator.detectChanges();
  });

  it('should create JobHeaderComponent ', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display substarte name from input ', () => {
    expect(spectator.query('.test-substrate-name')).toHaveText(defaultEntity.SubstrateName);
  });

  it('should send updated Entity on change and blur', () => {
    spectator.component.inlineEditInputs.first.editMode = true;
    spectator.detectChanges();
    const onChangeSpy = spyOn(spectator.component, 'triggerModelUpdate');
    const input = spectator.query('.job-title input') as HTMLElement;
    spectator.typeInElement('testJob', input);
    spectator.blur(input);
    expect(spectator.component.editableEntity.JobDetails.Name).toBe('testJob');
    expect(onChangeSpy).toHaveBeenCalledWith(spectator.component.editableEntity);
  });

  it('recognize when the field is not change and therfore not updating the model', () => {
    spectator.component.inlineEditInputs.first.editMode = true;
    spectator.detectChanges();
    const onChangeSpy = spyOn(spectator.component, 'triggerModelUpdate');
    const input = spectator.query('.job-title input') as HTMLElement;
    spectator.typeInElement('testJob', input);
    spectator.blur(input);
    spectator.typeInElement('yadayada', input);
    spectator.typeInElement('testJob', input);
    spectator.blur(input);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
});
