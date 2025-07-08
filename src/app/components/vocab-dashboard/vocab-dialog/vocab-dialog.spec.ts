import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabDialog } from './vocab-dialog';

describe('VocabDialog', () => {
  let component: VocabDialog;
  let fixture: ComponentFixture<VocabDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VocabDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
