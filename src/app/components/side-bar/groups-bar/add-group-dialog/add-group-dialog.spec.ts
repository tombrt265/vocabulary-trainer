import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupDialog } from './add-group-dialog';

describe('AddGroupDialog', () => {
  let component: AddGroupDialog;
  let fixture: ComponentFixture<AddGroupDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroupDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
