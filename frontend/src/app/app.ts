import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'vocab-trainer';
  readonly logo = 'assets/logo.png';
}
