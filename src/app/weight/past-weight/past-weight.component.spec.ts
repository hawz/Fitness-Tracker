import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastWeightComponent } from './past-weight.component';

describe('PastWeightComponent', () => {
  let component: PastWeightComponent;
  let fixture: ComponentFixture<PastWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
