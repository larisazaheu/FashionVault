import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-palette-page',
  templateUrl: './palette-page.component.html',
  styleUrl: './palette-page.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class PalettePageComponent implements OnInit {
  colors: string[] = [];
  readonly matchingSets = [
    ['White', 'Blue', 'Beige'],
    ['Brown', 'Orange', 'Cream'],
    ['Black', 'Gray', 'Pink'],
  ];

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.colors = [...new Set(items.map((item) => item.color))];
    });
  }
}
