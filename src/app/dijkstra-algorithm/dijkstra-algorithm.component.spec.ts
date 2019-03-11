import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DijkstraAlgorithmComponent } from './dijkstra-algorithm.component';

describe('DijkstraAlgorithmComponent', () => {
  let component: DijkstraAlgorithmComponent;
  let fixture: ComponentFixture<DijkstraAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DijkstraAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DijkstraAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
