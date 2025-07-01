import { Component } from '@angular/core';
import { VocabDashboard } from "./components/vocab-dashboard/vocab-dashboard";

@Component({
  selector: 'app-root',
  imports: [VocabDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vocab-trainer';
  readonly logo = 'assets/logo.png';
}
