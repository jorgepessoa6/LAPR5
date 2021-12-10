import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NodeService } from './node.service';

describe('NodeService', () => {
  let injector: TestBed;
  let service: NodeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NodeService],
    });

    injector = getTestBed();
    service = injector.get(NodeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addnode() should POST and return data', () => {
    service.addNode('Test', 'test', 1,1,'test', true,true).subscribe(res => {
      expect(res).toEqual({ msg: 'Nó de rede com nome Test adicionado' });
    });

    const req = httpMock.expectOne('https://mdrlapr.azurewebsites.net/api/node/post');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Nó de rede com nome Test adicionado' });
  });

  it('getNodes() should return data', () => {
    service.getNodes().subscribe(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdrlapr.azurewebsites.net/api/node/listarNome');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });
});
