import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);
  
  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product : Product) {
    this.productService.put(this.product.id, product)
    .subscribe(() => {
      this.matSnackBar.open('Item editado com sucesso!', 'Ok');

      this.router.navigateByUrl('/');
    });
  }

}
