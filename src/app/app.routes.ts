import { Routes } from '@angular/router';
import { VocabDashboard } from './components/vocab-dashboard/vocab-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: VocabDashboard,
    title: 'Home Page',
  },
];
