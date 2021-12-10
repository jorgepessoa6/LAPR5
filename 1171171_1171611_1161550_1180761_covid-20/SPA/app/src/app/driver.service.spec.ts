import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DriverService } from './driver.service';
import { Config } from './config';

describe('DriverService', () => {
  let injector: TestBed;
  let service: DriverService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DriverService],
    });

    injector = getTestBed();
    service = injector.get(DriverService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addDriver() should POST and return data', () => {
    service.addDriver('Test', 'test').subscribe(res => {
      expect(res).toEqual({ msg: 'Tipo de tripulante com nome Test adicionado!' });
    });

    const req = httpMock.expectOne(Config.mdrURL + '/api/driver/post');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Tipo de tripulante com nome Test adicionado!' });
  });

});
