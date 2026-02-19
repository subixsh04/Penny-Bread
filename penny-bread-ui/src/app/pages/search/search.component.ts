import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  
import { PriceService } from '../../services/price.service';
import { finalize } from 'rxjs';

type Product = {
  product_name: string;
  store_name: string;
  price: number | string;
  stock: number;
  in_stock: number | boolean;
}

@Component({
  selector: 'app-search',
  standalone: true,  
  imports: [CommonModule, FormsModule], 
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PriceService]
})
export class SearchComponent {
  @Input() location: string = '';

  searchQuery = '';
  products: any[] = [];
  hasSearched = false;

  loading = false;
  error: string | null = null;

  stores = ["Walmart", "Sam's Club", "Kroger", "Meijer", "Target"];
  selectedStores: string[] = [];

  constructor(private priceService: PriceService, private cdr: ChangeDetectorRef) {}

  selectStore(store: string) {
    if (this.selectedStores.includes(store)) {
      this.selectedStores = this.selectedStores = this.selectedStores.filter(s => s !== store);
    } else {
      this.selectedStores.push(store);
    }
  }

  clearFilters() {
    this.selectedStores = [];
  }

   get filtered(): Product[] {
    const q = this.searchQuery.trim().toLowerCase();

    return (this.products ?? []).filter((p) => {
      const matchesQuery = !q || (p.product_name ?? '').toLowerCase().includes(q);
      const matchesStore =
        this.selectedStores.length === 0 || this.selectedStores.includes(p.store_name);
      return matchesQuery && matchesStore;
    });
  }

  onSearch() {
    const q = this.searchQuery.trim();
    this.hasSearched = true;
    this.error = null;

    if (!q) {
      this.products = [];
      this.error = 'Type something to search (e.g., milk, bread, eggs).';
      return;
    }

    this.loading = true;

    this.priceService
      .searchProducts(q)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.products = Array.isArray(data) ? data : [];
        },
        error: (err) => {
          this.products = [];
          this.error =
            'Search failed. Check that the backend is running on port 5000 and try again.';
          console.error(err);
        },
      });
  }
}

//   filteredProducts() {
//   const q = this.searchQuery.trim().toLowerCase();

//   return this.products.filter((p: any) => {
//     const matchesQuery =

//     const matchesStore =
//       this.selectedStores.length === 0 ||
//       this.selectedStores.includes(p.store_name);

//     return matchesQuery && matchesStore;
//   });
// }


//   onSearch() {
//     this.hasSearched = true;
//     this.priceService.searchProducts(this.searchQuery).subscribe(data => {
//       this.products = data;
//       this.cdr.detectChanges();
//     });
//   }
// }