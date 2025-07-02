import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocabDialog } from './add-vocab-dialog';

describe('AddVocabDialog', () => {
  let component: AddVocabDialog;
  let fixture: ComponentFixture<AddVocabDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVocabDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVocabDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
