import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { WeightComponent } from './weight.component';
import { WeightRoutingModule } from './weight-routing.module';
import { NewWeightComponent } from './new-weight/new-weight.component';
import { PastWeightComponent } from './past-weight/past-weight.component';

@NgModule({
  declarations: [
    WeightComponent,
    NewWeightComponent,
    PastWeightComponent
  ],
  imports: [
    SharedModule,
    WeightRoutingModule
  ],
  exports: []
})
export class WeightModule {}
