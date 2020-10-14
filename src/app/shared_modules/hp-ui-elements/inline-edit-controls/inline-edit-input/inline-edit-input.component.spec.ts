import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { FormsModule } from '@angular/forms';
import { InlineEditInputComponent } from './inline-edit-input.component';

import { MockComponent } from 'ng-mocks';
describe('JobHeaderComponent suit', () => {
  let spectator: Spectator<InlineEditInputComponent>;
  const createComponent: () => Spectator<InlineEditInputComponent> = createComponentFactory({
    component: InlineEditInputComponent,
    detectChanges: false,
    imports: [FormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create InlineEditInputComponent ', () => {
    expect(spectator.component).toBeTruthy();
  });
});
