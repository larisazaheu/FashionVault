import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutfitEntryDetails } from '../../models/outfit-entry.model';

@Component({
  selector: 'app-outfit-day-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './outfit-day-overlay.component.html',
  styleUrl: './outfit-day-overlay.component.css',
})
export class OutfitDayOverlayComponent {
  @Input() outfit: OutfitEntryDetails | null = null;
  @Input() selectedDateLabel = '';

  @Output() closed = new EventEmitter<void>();
}
