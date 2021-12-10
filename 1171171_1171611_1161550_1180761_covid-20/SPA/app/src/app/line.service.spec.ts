import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LineService } from './line.service';

describe('LineService', () => {
  let injector: TestBed;
  let service: LineService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LineService],
    });

    injector = getTestBed();
    service = injector.get(LineService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addLine() should POST and return data', () => {
    service.addLine('Test','node','node', 'test').subscribe(res => {
      expect(res).toEqual({ msg: 'Linha da rede com nome Test adicionada!' });
    });

    const req = httpMock.expectOne('https://mdrlapr.azurewebsites.net/api/line/post');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Linha da rede com nome Test adicionada!' });
  });

  it('getLines() should return data', () => {
    service.getLines().subscribe(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdrlapr.azurewebsites.net/api/line/listarNome');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });
});
