import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { JobsSearchComponent } from './features/jobs-search/jobs-search.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'jobs-search/:job',
        component: JobsSearchComponent
    }
];
