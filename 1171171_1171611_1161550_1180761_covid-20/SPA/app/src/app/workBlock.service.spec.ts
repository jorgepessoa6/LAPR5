import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkBlockService } from './workBlock.service';

describe('WorkBlockService', () => {
  let injector: TestBed;
  let service: WorkBlockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkBlockService],
    });

    injector = getTestBed();
    service = injector.get(WorkBlockService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('addWorkBlock() should POST and return data', () => {
    service.addWorkBlock(1,[], 1, 1, [[]] ).subscribe(res => {
      expect(res).toEqual({ msg: 'Blocos de trabalho criados com sucesso'});
    });

    const req = httpMock.expectOne('https://mdvlapr.azurewebsites.net/api/WorkBlock');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Blocos de trabalho criados com sucesso' });
  });

  it('getAllWorkBlocks() should return data', () => {
    service.getAllWorkBlocks().then(res => {
      expect(res).toEqual({ id: 'something' });
    });

    const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === 'https://mdvlapr.azurewebsites.net/api/WorkBlock/all');
    expect(reqMock.request.method).toBe('GET');
    reqMock.flush({ id: 'something' });
  });

  
});
