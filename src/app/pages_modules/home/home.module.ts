import { NgModule } from '@angular/core';
import { HOME_IMPORTED_MODULES } from './home-imported-modules';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [HOME_IMPORTED_MODULES],
  declarations: [HomePageComponent]
})
export class HomeModule {}
