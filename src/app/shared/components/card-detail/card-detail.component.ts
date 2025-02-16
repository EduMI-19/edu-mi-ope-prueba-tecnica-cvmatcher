import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobDescriptionPipe } from "../../pipes/job-description.pipe";
import { ProperTitlePipe } from "../../pipes/proper-title.pipe";
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [JobDescriptionPipe, ProperTitlePipe],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent{
  @Input() job: Job | null = null;
  workSchedule : string = '';

  experienceOptions = [
    { value: 1, label: '1 año' },
    { value: 2, label: '2 años' },
    { value: 3, label: '3+ años' }
  ];

  workModalityOptions = [
    { value: 1, label: 'Presencial' },
    { value: 2, label: 'Híbrido' },
    { value: 3, label: 'Remoto' }
  ];

  getJobTypeLabel(value: number | null): string {
    const option = this.experienceOptions.find(opt => opt.value === value);
    return option ? option.label : 'Desconocido';
  }
  
  getWorkModalityLabel(value: number | undefined): string {
    const option = this.workModalityOptions.find(opt => opt.value === value);
    return option ? option.label : 'Desconocido';
  }  
  
}
