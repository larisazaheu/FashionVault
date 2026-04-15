import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayActionComponent } from '../../components/today-action/today-action.component';
import { WardrobeService } from '../../services/wardrobe.service';
import { WardrobeItem } from '../../models/wardrobe-item.model';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.css',
  standalone: true,
  imports: [CommonModule, TodayActionComponent]
})
export class WeatherPageComponent implements OnInit {
  items: WardrobeItem[] = [];

  readonly suggestions = [
    {
      title: 'Fresh morning breeze',
      note: 'Sky blue shirt, denim shorts, and Adidas Samba',
      temperature: '18°C'
    },
    {
      title: 'Sunny peak hours',
      note: 'Polka dot scarf top, mini skirt, and leather sandals',
      temperature: '25°C'
    },
    {
      title: 'Balmy evening walk',
      note: 'Silk slip dress, light denim jacket, and sneakers',
      temperature: '20°C'
    },
  ];

  constructor(private readonly wardrobeService: WardrobeService) { }

  ngOnInit(): void {
    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.items = items;
    });
  }
}