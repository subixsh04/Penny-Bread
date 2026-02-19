import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { PriceService } from '../../services/price.service';

type Product = {
  product_name: string;
  store_name: string;
  price: number | string;
  stock: number;
  in_stock: number | boolean;
};

type SortMode = 'cheapest' | 'stock' | 'a-z';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [PriceService],
})
export class SearchComponent {
  @Input() location: string = '';

  searchQuery = '';
  products: Product[] = [];
  hasSearched = false;

  loading = false;
  error: string | null = null;

  stores = ['Walmart', "Sam's Club", 'Kroger', 'Meijer', 'Target'];
  selectedStores: string[] = [];

  sortMode: SortMode = 'cheapest';

  constructor(private priceService: PriceService, private cdr: ChangeDetectorRef) {}

  selectStore(store: string) {
    if (this.selectedStores.includes(store)) {
      this.selectedStores = this.selectedStores.filter((s) => s !== store);
    } else {
      this.selectedStores = [...this.selectedStores, store];
    }
  }

  removeStoreChip(store: string) {
    this.selectedStores = this.selectedStores.filter((s) => s !== store);
  }

  clearFilters() {
    this.selectedStores = [];
  }

  private toPriceNumber(p: Product): number {
    const n = typeof p.price === 'string' ? Number(p.price) : p.price;
    return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
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

  get sortedFiltered(): Product[] {
    const list = [...this.filtered];

    switch (this.sortMode) {
      case 'cheapest':
        return list.sort((a, b) => this.toPriceNumber(a) - this.toPriceNumber(b));
      case 'stock':
        return list.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
      case 'a-z':
        return list.sort((a, b) => (a.product_name ?? '').localeCompare(b.product_name ?? ''));
      default:
        return list;
    }
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
          this.error = 'Search failed. Check backend and try again.';
          console.error(err);
        },
      });
  }
}
