import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings-tab',
  imports: [MatSlideToggleModule],
  templateUrl: './settings-tab.html',
  styleUrl: './settings-tab.scss',
})
export class SettingsTab {}
