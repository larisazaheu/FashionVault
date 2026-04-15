import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-carousel.component.html',
  styleUrl: './horizontal-carousel.component.css',
})
export class HorizontalCarouselComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) items: unknown[] = [];
  @Input() emptyMessage = 'Nothing to show yet.';
  @Input() ariaLabel = 'Carousel items';
  @Input() scrollStep = 276;

  @ContentChild(TemplateRef) itemTemplate?: TemplateRef<unknown>;
  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLElement>;

  canScrollLeft = false;
  canScrollRight = false;

  ngAfterViewInit(): void {
    this.scheduleNavigationUpdate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.scheduleNavigationUpdate();
    }
  }

  scrollLeft(): void {
    this.scrollBy(-this.scrollStep);
  }

  scrollRight(): void {
    this.scrollBy(this.scrollStep);
  }

  onScroll(): void {
    this.updateNavigationState();
  }

  private scrollBy(offset: number): void {
    if (!this.scrollContainer) {
      return;
    }

    this.scrollContainer.nativeElement.scrollBy({
      left: offset,
      behavior: 'smooth',
    });

    setTimeout(() => this.updateNavigationState(), 240);
  }

  private scheduleNavigationUpdate(): void {
    queueMicrotask(() => this.updateNavigationState());
  }

  private updateNavigationState(): void {
    const container = this.scrollContainer?.nativeElement;

    if (!container) {
      this.canScrollLeft = false;
      this.canScrollRight = false;
      return;
    }

    const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);

    this.canScrollLeft = container.scrollLeft > 4;
    this.canScrollRight = container.scrollLeft < maxScrollLeft - 4;
  }
}
