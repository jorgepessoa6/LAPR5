import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineDriverComponent } from './defineDriver.component';

describe('DefineDriverComponent', () => {
  let component: DefineDriverComponent;
  let fixture: ComponentFixture<DefineDriverComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DefineDriverComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineDriverComponent);
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
