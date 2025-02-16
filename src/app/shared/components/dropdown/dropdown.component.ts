import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() label: string = 'Seleccionar';
  @Input() options: { value: any; label: string }[] = [];
  @Output() selectionChange = new EventEmitter<any>(); 
  
  selectedValue = signal<any>(null);
  isOpen = signal<boolean>(false);

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: any) {
    this.selectedValue.set(option);
    this.selectionChange.emit(option.value);
    this.isOpen.set(false);
  }
}
