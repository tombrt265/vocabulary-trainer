import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabCard } from './vocab-card';

describe('VocabCard', () => {
  let component: VocabCard;
  let fixture: ComponentFixture<VocabCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
