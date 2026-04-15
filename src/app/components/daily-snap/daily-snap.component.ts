import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-daily-snap',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './daily-snap.component.html',
    styleUrl: './daily-snap.component.css',
})
export class DailySnapComponent {
    @Input() imageUrl: string | null = null;
    @Input() buttonLabel = 'Upload image';
    @Output() previewChange = new EventEmitter<string | null>();

    readonly inputId = `daily-snap-input-${Math.random().toString(36).slice(2)}`;

    onSnapSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === 'string' ? reader.result : null;
            this.imageUrl = result;
            this.previewChange.emit(result);
        };

        reader.readAsDataURL(file);
    }

    clearSnap(): void {
        this.imageUrl = null;
        this.previewChange.emit(null);
    }
}
