import { Component } from '@angular/core';
import { VocabCard } from './vocab-card/vocab-card';

@Component({
  selector: 'app-vocab-dashboard',
  imports: [VocabCard],
  templateUrl: './vocab-dashboard.html',
  styleUrl: './vocab-dashboard.scss',
})
export class VocabDashboard {}
