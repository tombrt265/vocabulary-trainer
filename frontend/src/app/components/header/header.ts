import { Component, signal } from '@angular/core';
import { GroupsBar } from '../side-bar/groups-bar/groups-bar';
import { SettingsTab } from '../side-bar/settings-tab/settings-tab';

@Component({
  selector: 'app-header',
  imports: [GroupsBar, SettingsTab],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isBucketsTabVisible = signal(false);
  isSettingsTabVisible = signal(false);
  readonly logo = 'assets/logo.png';

  onBucketsClick() {
    this.isBucketsTabVisible.update((value) => !value);
  }

  onSettingsClick() {
    this.isSettingsTabVisible.update((value) => !value);
  }
}
