import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);
  
  onSubmit(product : Product) {
    this.productService.post(product).subscribe(() => {
      this.matSnackBar.open('Item adicionado com sucesso!', 'Ok');
      this.router.navigateByUrl('/');
    });
  }
  
}
