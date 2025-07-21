import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsBar } from './components/side-bar/groups-bar/groups-bar';

@Component({
  selector: 'app-root',
  imports: [RouterModule, GroupsBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vocab-trainer';
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
