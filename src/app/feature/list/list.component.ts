import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../shared/components/form/form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, CommonModule, FormComponent, MatIconModule, MatCheckboxModule],
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
    this.productsService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  onAdd(product: Product) {
    this.productsService.post(product).subscribe(() => {
      this.matSnackBar.open('Item adicionado com sucesso!', 'Ok');
      this.loadProducts();
    });
  }

  onEdit(product: Product) {
    this.editingProduct = product;
    this.isEditing = true;
  }

  onSaveEdit(product: Product) {
    if (this.editingProduct) {
      this.productsService.put(this.editingProduct.id, product).subscribe(() => {
        this.matSnackBar.open('Item editado com sucesso!', 'Ok');
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
    this.productsService.onDelete(productId).subscribe(() => {
      this.matSnackBar.open('Item excluído com sucesso!', 'Ok');
      this.loadProducts();
      this.purchasedProducts = this.purchasedProducts.filter(p => p.id !== productId);
    });
  }

  onCancelEdit() {
    this.isEditing = false;
    this.editingProduct = null;
  }
}