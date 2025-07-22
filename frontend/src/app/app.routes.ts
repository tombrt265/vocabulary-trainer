import { Routes } from '@angular/router';
import { VocabDashboard } from './components/vocab-dashboard/vocab-dashboard';
import { LandingPage } from './components/landing-page/landing-page';
import { DefaultPage } from './components/default-page/default-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Vocabulary Trainer',
  },
  {
    path: 'home',
    component: VocabDashboard,
    title: 'Home Page',
  },
];
