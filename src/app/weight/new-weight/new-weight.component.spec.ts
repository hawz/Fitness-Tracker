import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWeightComponent } from './new-weight.component';

describe('NewWeightComponent', () => {
  let component: NewWeightComponent;
  let fixture: ComponentFixture<NewWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
