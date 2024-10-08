import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
 

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() product: Product | null = null;
  @Output() btn = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue(this.product);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.btn.emit(this.form.value as Product);
      this.form.reset();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset();
  }
}
