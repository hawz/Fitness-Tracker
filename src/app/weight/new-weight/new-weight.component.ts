import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UIService } from 'src/app/shared/ui.service';
import { WeightService } from '../weight.service';
import { Weight } from '../weight.model';

@Component({
  selector: 'app-new-weight',
  templateUrl: './new-weight.component.html',
  styleUrls: ['./new-weight.component.css']
})
export class NewWeightComponent implements OnInit, OnDestroy {
  isLoading = false;
  currentWeight: Weight;
  canInsertWeight = false;
  private loadingSubscription: Subscription;
  private weightSubscription: Subscription;

  constructor(
    private weightService: WeightService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    // this.user = this.authService.getUser();
    // console.log(this.user);
    this.weightSubscription = this.weightService.todayWeight.subscribe(
      (weightMeasurements: Weight[]) => {
        this.currentWeight = weightMeasurements[0];
        this.canInsertWeight = !!this.currentWeight === false;
      }
    );

    this.loadingSubscription = this.uiService.loadingStateChanged
      .subscribe(isLoading => this.isLoading = isLoading);

    this.weightService.fetchTodayWeight();
  }

  onWeightSubmit(form: NgForm) {
    console.log('onWeightSubmit', form.value);
    this.weightService.insertWeightMeasurement(form.value.weight);
  }



  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.weightSubscription) {
      this.weightSubscription.unsubscribe();
    }
  }

}
