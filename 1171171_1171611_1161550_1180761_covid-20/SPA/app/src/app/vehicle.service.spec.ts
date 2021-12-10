import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Path } from './path/path';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let injector: TestBed;
  let service: VehicleService;
  let httpMock: HttpTestingController;
  let path: Path = { key: "nameInput",isEmpty: true, pathNodes: []};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService],
    });

    injector = getTestBed();
    service = injector.get(VehicleService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addVehicle() should POST and return data', () => {
    service.addVehicle('00-XX-00','123456789', "Carro", new Date(2021,1,1)).subscribe(res => {
      expect(res).toEqual({ msg: 'Tipo de viatura com a matricula 00-XX-00 adicionada'});
    });

    const req = httpMock.expectOne('https://mdvlapr.azurewebsites.net/api/Vehicle');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Tipo de viatura com a matricula 00-XX-00 adicionada' });
  });

});
