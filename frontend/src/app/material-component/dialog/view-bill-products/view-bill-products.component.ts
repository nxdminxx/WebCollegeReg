import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total'];
  dataSource: any;
  data: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewBillProductsComponent>
  ) {}

  ngOnInit() {
    this.data = this.dialogData.data;
    console.log('Complete Data:', this.data);
  
    if (this.data && this.data.products) {
      console.log('ProductDetails:', this.data.products);
      this.dataSource = this.data.products; // Set dataSource to the products array
    } else {
      console.error('productDetails is not available in the data object.');
    }
  }
  

  parseProductDetails() {
    if (this.data && this.data.productDetails) {
      try {
        console.log('ProductDetails type:', typeof this.data.productDetails);
        const productDetails = this.data.productDetails;
        if (typeof productDetails === 'string') {
          console.log('Parsing JSON string...');
          this.dataSource = JSON.parse(productDetails);
          console.log('Parsed dataSource:', this.dataSource);
        } else if (typeof productDetails === 'object' && productDetails !== null) {
          console.log('Using productDetails directly as dataSource...');
          this.dataSource = productDetails;
          console.log('dataSource:', this.dataSource);
        } else {
          console.error('productDetails is not a valid JSON string or object.');
        }
      } catch (error) {
        console.error('Error parsing productDetails:', error);
      }
    } else {
      console.error('productDetails is not available in the data object.');
    }
  }
}
