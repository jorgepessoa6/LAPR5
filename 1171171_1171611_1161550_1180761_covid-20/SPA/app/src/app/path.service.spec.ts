import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PathService } from './path.service';
import { Direction } from './path/direction';
import { Config } from './config';

describe('PathService', () => {
  let injector: TestBed;
  let service: PathService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PathService],
    });

    injector = getTestBed();
    service = injector.get(PathService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addPath() should POST and return data', () => {
    service.addPath('Test', 'test','test',Direction.Go,true,[]).subscribe(res => {
      expect(res).toEqual({ msg: 'Path da rede com nome Test adicionada!' });
    });

    const req = httpMock.expectOne(Config.mdrURL + '/api/path/post');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Path da rede com nome Test adicionada!' });
  });

  it('getPaths() should return data', () => {
    service.getAllPaths().subscribe(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url ===  Config.mdrURL + '/api/path/listarTodosPercursos');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });
});
