import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { WardrobeService } from './services/wardrobe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class App implements OnInit {
  isLoginPage = false;

  favoritesCount = 0;

  constructor(private router: Router, private readonly wardrobeService: WardrobeService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.isLoginPage = url.includes('login') || url.includes('register');
    });

    this.wardrobeService.getWardrobeItems().subscribe((items) => {
      this.favoritesCount = items.filter((item) => item.isFavorite).length;
    });
  }

  openFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  readonly navItems = [
    { label: 'Dashboard', route: '/dashboard', hint: 'Overview' },
    { label: 'Wardrobe', route: '/wardrobe', hint: 'Closet view' },
    { label: 'Laundry', route: '/laundry', hint: 'Status tracking' },
    { label: 'Outfits', route: '/outfits', hint: 'Builder and saves' },
    { label: 'Weather', route: '/weather', hint: 'Daily ideas' },
    { label: 'Planner', route: '/planner', hint: 'Weekly looks' },
    { label: 'Palette', route: '/palette', hint: 'Colors and style' },
    { label: 'Capsule', route: '/capsule', hint: 'Favorites edit' },
    { label: 'Declutter', route: '/declutter', hint: 'Unused items' },
    { label: 'Travel', route: '/travel', hint: 'Packing list' },
  ];
}