import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVocabDialog } from './edit-vocab-dialog';

describe('EditVocabDialog', () => {
  let component: EditVocabDialog;
  let fixture: ComponentFixture<EditVocabDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVocabDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVocabDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
