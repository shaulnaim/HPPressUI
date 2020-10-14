import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ReplaceInksComponent } from './replace-inks.component';
describe('ReplaceInksComponent suit', () => {
  let spectator: Spectator<ReplaceInksComponent>;
  const createComponent: () => Spectator<ReplaceInksComponent> = createComponentFactory({
    component: ReplaceInksComponent
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the ReplaceInksComponent', () => {
    const inksComponent = spectator.component;
    expect(inksComponent).toBeTruthy();
  });
  it('should display 5 inks colors', () => {
    spectator.setInput('inksArr', ['green', 'white', 'black', 'yellow', 'cyan']);
    expect('li').toHaveLength(5);
  });
  it('should show inks  according to the [inksColor] input', () => {
    spectator.setInput('inksArr', ['green', 'white', 'black']);
    expect(spectator.query('ul li:nth-child(1)')).toHaveClass('green');
    expect(spectator.query('ul li:nth-child(2)')).toHaveClass('white');
    expect(spectator.query('ul li:nth-child(3)')).toHaveClass('black');
  });
});
