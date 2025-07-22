import { Component, signal } from '@angular/core';
import { GroupsBar } from '../side-bar/groups-bar/groups-bar';

@Component({
  selector: 'app-header',
  imports: [GroupsBar],
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
