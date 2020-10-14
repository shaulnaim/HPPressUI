import { SpectatorDirective, createDirectiveFactory, SpectatorWithHost } from '@ngneat/spectator/jest';
import { FocusableDirective } from './focusable.directive';

describe('focusableDirective', () => {
  let spectator: SpectatorDirective<FocusableDirective>;
  const createDirective = createDirectiveFactory(FocusableDirective);

  beforeEach(() => {
    spectator = createDirective(`<input focusable />`);
  });

  it('should be focused', () => {
    expect(spectator.query('input')).toBeFocused();
  });

  it('should be able to type in input', () => {
    expect(spectator.query('input')).toBeFocused();
    spectator.typeInElement('foo', spectator.query('input'));
    expect(spectator.query('input')).toContainValue('foo');
  });
});
