import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentListOfTimerComponent } from './present-list-of-timer.component';

describe('PresentListOfTimerComponent', () => {
  let component: PresentListOfTimerComponent;
  let fixture: ComponentFixture<PresentListOfTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentListOfTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentListOfTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
