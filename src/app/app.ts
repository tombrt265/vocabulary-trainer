import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupsBar } from "./components/side-bar/groups-bar/groups-bar";

@Component({
  selector: 'app-root',
  imports: [RouterModule, GroupsBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vocab-trainer';
  isGroupsVisible = signal(false);
  isSettingsVisible = signal(false);
  readonly logo = 'assets/logo.png';

  showGroupBar() {
    this.isGroupsVisible.update((value) => !value);
  }

  showSettingsBar() {
    this.isSettingsVisible.update((value) => !value);
  }
}
