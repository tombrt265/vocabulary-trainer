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
    path: 'default',
    component: DefaultPage,
    title: 'Default Page',
  },
  {
    path: 'vocabulary/:bucketName',
    component: VocabDashboard,
    title: 'Vocabulary Dashboard',
  },
];
