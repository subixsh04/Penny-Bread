// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common'; 
// import { FormsModule } from '@angular/forms';  
// import { PriceService } from '../../services/price.service';

// @Component({
//   selector: 'app-search',
//   standalone: true,  
//   imports: [CommonModule, FormsModule], 
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css'],
//   providers: [PriceService]
// })
// export class SearchComponent {
//   searchQuery = '';
//   location = 'Wright State University, Ohio';
//   products: any[] = [];
//   hasSearched = false;
//   isLoading = false;

//   constructor(private priceService: PriceService) {}

//  onSearch() {
//   if (!this.searchQuery.trim()) {
//       return; // optional: don't search empty input
//   }
//   this.isLoading = true
//   this.hasSearched = false;
//   this.priceService.searchProducts(this.searchQuery).subscribe(data => {
//     console.log('API response:', data);
//     this.isLoading = false;
//     this.hasSearched = true;
//     this.products = data;
//   });
// }
// }


import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-search',
  standalone: true,  
  imports: [CommonModule, FormsModule], 
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PriceService]
})
export class SearchComponent {
  searchQuery = '';
  location = 'Wright State University, Ohio';
  products: any[] = [];
  hasSearched = false;

  constructor(private priceService: PriceService, private cdr: ChangeDetectorRef) {}

 onSearch() {
  this.hasSearched = true;
  this.priceService.searchProducts(this.searchQuery).subscribe(data => {
    this.products = data;
    this.cdr.detectChanges();
  })
  }
}