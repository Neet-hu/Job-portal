import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.jobs = res;
        } else {
          console.error('Jobs API did not return array:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }
}
