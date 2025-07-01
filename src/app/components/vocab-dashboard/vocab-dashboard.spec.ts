import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabDashboard } from './vocab-dashboard';

describe('VocabDashboard', () => {
  let component: VocabDashboard;
  let fixture: ComponentFixture<VocabDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
