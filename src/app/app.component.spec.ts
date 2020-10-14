import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
describe('AppComponent suit', () => {
  const createComponent: () => Spectator<AppComponent> = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule.withRoutes([{ path: '', redirectTo: '/home', pathMatch: 'full' }])]
  });
  let spectator: Spectator<AppComponent>;
  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });
});
