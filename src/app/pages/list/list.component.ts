import { Component, OnInit } from '@angular/core';
import { ListedApiService } from '../../listed-api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  gifs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(
    private listedApiService: ListedApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listedApiService.getGifs().subscribe((data) => {
      this.gifs = data;
    });
  }

  get paginatedGifs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.gifs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.gifs.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToHome(gif: any) {
    this.router.navigate(['/home'], {
      queryParams: { gif: JSON.stringify(gif) },
      fragment: 'selected-gif',
    });
  }
}
