import { Component } from '@angular/core';
import { SearchComponent } from "./pages/search/search.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SearchComponent, FormsModule, SearchComponent]
})
export class AppComponent {}
