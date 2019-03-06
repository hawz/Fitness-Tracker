import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeightService } from '../weight.service';
import { Weight } from '../weight.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-weight',
  templateUrl: './past-weight.component.html',
  styleUrls: ['./past-weight.component.css']
})
export class PastWeightComponent implements OnInit {
  displayedColumns = ['date', 'weight'];
  dataSource = new MatTableDataSource<Weight>();
  private weightChangedSubscription: Subscription;

  constructor(private weightService: WeightService) { }

  ngOnInit() {
    this.weightChangedSubscription = this.weightService.weightMeasurementsChanged.subscribe(
      (weights: Weight[]) => {
        console.log(weights);
        this.dataSource.data = weights;
      }
    );

    this.weightService.fetchWeightMeasurements();
  }

}
