import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Subject } from 'rxjs';

import { Weight } from './weight.model';
import { UIService } from '../shared/ui.service';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class WeightService {
  weightMeasurementsChanged = new Subject<Weight[]>();
  todayWeight = new Subject<Weight[]>();
  private currentWeight: Weight;
  private firebaseSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private userService: UserService
  ) {}

  fetchTodayWeight() {
    // this method fetches the single weight measurement for today
    // as only 1 measurement per day is allowed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(today.getDate() + 1);

    this.uiService.loadingStateChanged.next(true);
    this.db.collection('weightMeasurements', ref =>
      ref
        .where('userUID', '==', this.userService.getUser().userId)
        .where('date', '>', today)
        .where('date', '<', tomorrow)
        .orderBy('date', 'desc')
    )
    .valueChanges()
    .subscribe((weightMeasurements: Weight[]) => {
      this.uiService.loadingStateChanged.next(false);
      this.todayWeight.next(weightMeasurements);
    });
  }

  fetchWeightMeasurements(limit = 30) {
    // this method fetches all the past weight measurements
    // it has to be called from past-weights component
    // or from the new weight component with limit = 1
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubs.push(
      this.db
        .collection('weightMeasurements', ref =>
          ref
            .where('userUID', '==', this.userService.getUser().userId)
            .orderBy('date', 'desc')
            .limit(limit)
        )
        .valueChanges()
        .subscribe((weightMeasurements: Weight[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.weightMeasurementsChanged.next(weightMeasurements);
        })
    );
  }

  insertWeightMeasurement(value: number) {
    this.currentWeight = {
      userUID: this.userService.getUser().userId,
      weight: value,
      date: new Date()
    };

    this.addDataToDatabase(this.currentWeight)
      .then()
      .catch(
        error => {
          this.uiService.openSnackBar('Inserting weight failed, please try again later.', null, 3000);
        }
      );
  }

   cancelSubscriptions() {
     this.firebaseSubs.forEach(sub => sub.unsubscribe());
   }

  private addDataToDatabase(weight: Weight) {
    return this.db.collection('weightMeasurements').add(weight);
  }
}
