import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './feature/list/list.component';
import { CreateComponent } from './feature/create/create.component';
import { ProductsService } from './shared/services/products.service';
import { inject } from '@angular/core';

export const routes: Routes = [{ 
        path: '',
        component: ListComponent
    
    },
    {
        path: 'create-product',
        loadComponent: () =>
            import("./feature/create/create.component").then((m) => m.CreateComponent)
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
    }
];
