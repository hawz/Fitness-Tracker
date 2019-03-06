import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeightService } from '../weight.service';
import { Weight } from '../weight.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-weight',
  templateUrl: './past-weight.component.html',
  styleUrls: ['./past-weight.component.css']
})
export class PastWeightComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'weight'];
  dataSource = new MatTableDataSource<Weight>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private weightChangedSubscription: Subscription;

  constructor(private weightService: WeightService) { }

  ngOnInit() {
    this.weightChangedSubscription = this.weightService.weightMeasurementsChanged.subscribe(
      (weights: Weight[]) => {
        this.dataSource.data = weights;
      }
    );
    this.weightService.fetchWeightMeasurements();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.weightChangedSubscription) {
      this.weightChangedSubscription.unsubscribe();
    }
  }

}
