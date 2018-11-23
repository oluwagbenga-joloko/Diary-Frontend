import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonalLoaderComponent } from './horizonal-loader.component';

describe('HorizonalLoaderComponent', () => {
  let component: HorizonalLoaderComponent;
  let fixture: ComponentFixture<HorizonalLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonalLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
