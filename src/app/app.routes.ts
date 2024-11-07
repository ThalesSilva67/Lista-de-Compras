import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';
import { ProductsService } from './shared/services/products.service';
import { inject } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [{ 
        path: '',
        component: ListComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full'
    
    },
    {
        path: 'create-product',
        loadComponent: () =>
            import("./feature/create/create.component").then((m) => m.CreateComponent),
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const productService = inject(ProductsService);

               return productService.get(route.paramMap.get('id') as string);
            }
        },
        loadComponent: () => import("./feature/edit/edit.component").then((m) => m.EditComponent)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]

    },
    {
        path: '**',
        component: NotFoundComponent
    },

];
