import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'oauth',
        pathMatch: 'full'
    },
    {
        path: 'oauth',
        loadChildren: () => import('./layouts/oauth-layout/oauth-layout.routes').then(c => c.OAuthLayoutRoutes)
    }
];