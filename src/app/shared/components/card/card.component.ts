import { Component, Input } from '@angular/core';
import { Job } from '../../models/job.model';
import { ProperTitlePipe } from "../../pipes/proper-title.pipe";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ProperTitlePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() job!: Job;
}
