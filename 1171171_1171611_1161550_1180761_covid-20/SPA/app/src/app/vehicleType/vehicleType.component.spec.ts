import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeComponent } from './vehicleType.component';

describe('VehicleTypeComponent', () => {
  let component: VehicleTypeComponent;
  let fixture: ComponentFixture<VehicleTypeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [VehicleTypeComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  afterEach(() => {
    fixture.destroy();
  });
});
