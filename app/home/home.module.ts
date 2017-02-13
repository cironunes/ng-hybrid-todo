import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    ComponentsModule,
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule {

}