import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardrobeItem } from '../../models/wardrobe-item.model';
import { WardrobeService } from '../../services/wardrobe.service';

@Component({
  selector: 'app-capsule-page',
  templateUrl: './capsule-page.component.html',
  styleUrl: './capsule-page.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class CapsulePageComponent implements OnInit {
  capsuleItems: WardrobeItem[] = [];

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.capsuleItems = items.filter((item) => item.isFavorite).slice(0, 6);
    });
  }
}
