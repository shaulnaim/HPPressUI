import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MockComponent } from 'ng-mocks';
import { SlotComponent } from './slot.component';
import { ReplaceInksComponent } from '../replace-inks/replace-inks.component';
import { JobHeaderComponent } from '../job-header/job-header.component';

describe('SlotComponent suit', () => {
  let spectator: Spectator<SlotComponent>;
  const createComponent: () => Spectator<SlotComponent> = createComponentFactory({
    component: SlotComponent,
    declarations: [MockComponent(ReplaceInksComponent), MockComponent(JobHeaderComponent)]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create SlotComponent ', () => {
    const slotComponent = spectator.component;
    expect(slotComponent).toBeTruthy();
  });
});
