import { Component, EventEmitter, Output, signal } from '@angular/core';
import { DropdownComponent } from "../../../../shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Output() filterChange = new EventEmitter<void>();
  selectedExperience = signal<number | null>(null);
  selectedWorkModality = signal<number | null>(null);

  experienceOptions = [
    { value: null, label: 'Todos' },
    { value: 1, label: '1 año' },
    { value: 2, label: '2 años' },
    { value: 3, label: '3+ años' }
  ];

  workModalityOptions = [
    { value: null, label: 'Todos' },
    { value: 1, label: 'Presencial' },
    { value: 2, label: 'Híbrido' },
    { value: 3, label: 'Remoto' }
  ];

  onExperienceChange(value: any): void {
    this.selectedExperience.set(value);
    this.filterChange.emit();
  }

  onWorkModalityChange(value: any): void {
    this.selectedWorkModality.set(value);
    this.filterChange.emit();
  }

  getFilters() {
    return {
      experience: this.selectedExperience(),
      workModality: this.selectedWorkModality()
    };
  }
  
}
