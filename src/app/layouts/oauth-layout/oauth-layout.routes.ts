import { Routes } from "@angular/router";

export const OAuthLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./oauth-layout.component').then(c => c.OAuthLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'sign-up',
                pathMatch: 'full'
            },
            {
                path: 'sign-up',
                loadComponent: () => import('../../feature/sign-up/sign-up.component').then(c => c.SignUpComponent)
            }
        ]
    }
]