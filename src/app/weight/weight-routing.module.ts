import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightComponent } from './weight.component';

const routes: Routes = [
  { path: '', component: WeightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightRoutingModule {}
