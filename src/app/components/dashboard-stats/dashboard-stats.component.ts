import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardStats } from '../../models/dashboard-stats.model';
import { StatCardComponent } from '../stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.css',
})
export class DashboardStatsComponent {
  @Input() stats: DashboardStats | null = null;
}
