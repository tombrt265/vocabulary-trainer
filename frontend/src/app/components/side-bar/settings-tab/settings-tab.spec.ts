import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTab } from './settings-tab';

describe('SettingsComponent', () => {
  let component: SettingsTab;
  let fixture: ComponentFixture<SettingsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTab],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
