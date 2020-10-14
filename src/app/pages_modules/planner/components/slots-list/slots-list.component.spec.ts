import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { MockComponent } from 'ng-mocks';
import { SlotComponent } from '../slot/slot.component';
import { SlotsListComponent } from './slots-list.component';
import { PlannerSlotEntityModel } from 'app-planner-api';

describe('SlotComponent suit', () => {
  let spectator: Spectator<SlotsListComponent>;
  const createComponent: () => Spectator<SlotsListComponent> = createComponentFactory({
    component: SlotsListComponent,
    mocks: [PlannerSlotEntityModel],
    declarations: [MockComponent(SlotComponent)]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create SlotsListComponent ', () => {
    const slotsListComponent = spectator.component;
    expect(slotsListComponent).toBeTruthy();
  });
});
