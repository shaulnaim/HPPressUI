import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { ErrorHandlerService, StartupService } from 'hp-services';
import { APP_IMPORTED_MODULES } from './app-imported-modules';
import { AppComponent } from './app.component';

export function startupServiceFactory(startupService: StartupService): () => void {
  return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [APP_IMPORTED_MODULES],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
