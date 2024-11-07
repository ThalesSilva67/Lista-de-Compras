import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../shared/components/form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from '../../login/login.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, CommonModule, FormComponent, MatIconModule, MatCheckboxModule, RouterOutlet, LoginComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);

  products: Product[] = [];
  purchasedProducts: Product[] = [];
  editingProduct: Product | null = null;
  isEditing = false;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAll().pipe(
      catchError((error) => {
        this.showError('Erro ao carregar produtos!');
        console.error('Erro:', error);
        return throwError(() => error);
      })
    ).subscribe((data) => {
      this.products = data;
    });
  }

  onAdd(product: Product) {
    this.productsService.post(product).pipe(
      catchError((error) => {
        this.showError('Erro ao adicionar item!');
        console.error('Erro:', error);
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.showSuccess('Item adicionado com sucesso!');
      this.loadProducts();
    });
  }

  onEdit(product: Product) {
    this.editingProduct = product;
    this.isEditing = true;
  }

  onSaveEdit(product: Product) {
    if (this.editingProduct) {
      this.productsService.put(this.editingProduct.id, product).pipe(
        catchError((error) => {
          this.showError('Erro ao editar item!');
          console.error('Erro:', error);
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.showSuccess('Item editado com sucesso!');
        this.isEditing = false;
        this.editingProduct = null;
        this.loadProducts();
      });
    }
  }

  onPurchase(product: Product, isChecked: boolean) {
    if (isChecked) {
      this.purchasedProducts.push(product);
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }

  onDelete(productId: string) {
    this.productsService.onDelete(productId).pipe(
      catchError((error) => {
        this.showError('Erro ao excluir item!');
        console.error('Erro:', error);
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.showSuccess('Item excluído com sucesso!');
      this.loadProducts();
      this.purchasedProducts = this.purchasedProducts.filter(p => p.id !== productId);
    });
  }

  onCancelEdit() {
    this.isEditing = false;
    this.editingProduct = null;
  }

  showSuccess(message: string) {
    this.matSnackBar.open(message, 'Ok');
  }

  showError(message: string) {
    this.matSnackBar.open(message, 'Fechar');
  }
}