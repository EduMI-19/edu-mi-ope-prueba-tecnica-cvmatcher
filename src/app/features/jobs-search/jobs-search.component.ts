import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { JobService } from '../../core/services/job.service';
import { Job } from '../../shared/models/job.model';
import { CardComponent } from "../../shared/components/card/card.component";
import { CardDetailComponent } from "../../shared/components/card-detail/card-detail.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { SearchFormComponent } from "./components/search-form/search-form.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-search',
  standalone: true,
  imports: [CardComponent, CardDetailComponent, FiltersComponent, SearchFormComponent],
  templateUrl: './jobs-search.component.html',
  styleUrl: './jobs-search.component.scss'
})
export class JobsSearchComponent implements OnInit  {
  
  @ViewChild(FiltersComponent) filtersComponent!: FiltersComponent;
  jobs = signal<Job[]>([]);
  filteredJobs = signal<Job[]>([]);
  selectedJob = signal<Job | null>(null);
  searchTitle = signal('');
  searchLocation = signal('');

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs.set(data);
      this.filteredJobs.set(data);
      if (data.length > 0) {
        this.selectedJob.set(data[0]);
      }
    });
  }

  selectJob(job: Job): void {
    this.selectedJob.set(job);
  }
  
  onSearch(searchData: { title: string; location: string }): void {
    this.searchTitle.set(searchData.title);
    this.searchLocation.set(searchData.location);
    this.performSearch();
  }

  performSearch(): void {
    let title = this.searchTitle().toLowerCase();
    let location = this.searchLocation().toLowerCase();
    
    let titleSearch = title.replace(/\s+/g,"-")

    if (title && location) {
      titleSearch = titleSearch + "-en-" + location;
    } 
    else if (title && !location){
      titleSearch = title;
    } 
    else if (!title && location) {
      titleSearch = "allJobs-en-" + location;
    } 
    else if (!title && !location) {
      titleSearch = "All";
    }

    console.log(titleSearch)
    this.router.navigate(['/jobs-search/'+titleSearch]);
    
    let results = this.jobs().filter((job) => {
      return (
        (title === '' || job.title.toLowerCase().includes(title)) &&
        (location === '' || job.location.toLowerCase().includes(location))
      );
    });

    if (this.filtersComponent) {
      const filters = this.filtersComponent.getFilters();
      results = results.filter(job => {
        return (
          (filters.experience === null || job.years_experience >= filters.experience) &&
          (filters.workModality === null || job.work_modality_id === filters.workModality)
        );
      });
    }

    this.filteredJobs.set(results);

    if (results.length > 0) {
      this.selectedJob.set(results[0]);
    } else {
      this.selectedJob.set(null);
    }

  }
}
