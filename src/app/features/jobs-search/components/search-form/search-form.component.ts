import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent{
  @Output() search = new EventEmitter<{ title: string; location: string }>();

  searchForm: FormGroup = this.fb.group({
    title: [''],
    location: ['']
  });

  constructor(private fb: FormBuilder){}

  onSubmit(): void {
    const formValues = this.searchForm.value;
    this.search.emit({
      title: formValues.title,
      location: formValues.location
    });
  }
}
