import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TripService } from './trip.service';
import { Path } from './path/path';

describe('TripService', () => {
  let injector: TestBed;
  let service: TripService;
  let httpMock: HttpTestingController;
  let path: Path = { key: "nameInput",isEmpty: true, pathNodes: []};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripService],
    });

    injector = getTestBed();
    service = injector.get(TripService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addTrips() should POST and return data', () => {
    service.addTrips(1,'Test','Line', 1, 1, null, null).subscribe(res => {
      expect(res).toEqual({ msg: 'Viagem para a linha da rede com nome Line com início às 1 horas, adicionada!'});
    });

    const req = httpMock.expectOne('https://mdvlapr.azurewebsites.net/api/Trip');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Viagem para a linha da rede com nome Line com início às 1 horas, adicionada!' });
  });

  it('addTripAdHoc() should POST and return data', () => {
    service.addTripAdHoc(1,'Test','Line', null).subscribe(res => {
      expect(res).toEqual({ msg: 'Viagem para a linha da rede com nome Line com início às 1 horas, adicionada!'});
    });

    const req = httpMock.expectOne('https://mdvlapr.azurewebsites.net/api/Trip/AdHoc');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Viagem para a linha da rede com nome Line com início às 1 horas, adicionada!' });
  });

  it('getTripsOfLine() should return data', () => {
    service.getTripsOfLine("Line: 1").subscribe(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdvlapr.azurewebsites.net/api/Trip/all/Line: 1');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });

  it('getAllTrips() should return data', () => {
    service.getAllTrips().then(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdvlapr.azurewebsites.net/api/Trip/all');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });

  it('getTripsWithoutWorkBlock() should return data', () => {
    service.getTripsWithoutWorkBlock().subscribe(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdvlapr.azurewebsites.net/api/Trip/tripsWithoutWorkBlock');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });

  it('getPassingTimes() should return data', () => {
    service.getPassingTimes("123456789").then(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdvlapr.azurewebsites.net/api/Trip/getPassingTimes/123456789');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });

});
