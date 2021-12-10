/* import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleTypeService } from './vehicleType.service';

describe('VehicleTypeService', () => {
  let injector: TestBed;
  let service: VehicleTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleTypeService],
    });

    injector = getTestBed();
    service = injector.get(VehicleTypeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addVehicleType() should POST and return data', () => {
    service.addVehicleType('Test', 123,123, 123, 1, 123, 123).subscribe(res => {
      expect(res).toEqual({ msg: 'Tipo de viatura com nome Test adicionado!' });
    });

    const req = httpMock.expectOne('http://localhost:3000/api/vehicle/post');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Tipo de viatura com nome Test adicionado!' });
  });

});
 */