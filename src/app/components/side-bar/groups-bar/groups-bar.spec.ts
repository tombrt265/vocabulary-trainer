import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsBar } from './groups-bar';

describe('GroupsBar', () => {
  let component: GroupsBar;
  let fixture: ComponentFixture<GroupsBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupsBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
