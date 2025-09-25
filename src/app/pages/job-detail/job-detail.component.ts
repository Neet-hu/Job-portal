import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: any = {};              // Store job details
  resumeFile: File | null = null; // File selected by user
  jobId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    // Get job ID from URL
    const idParam = this.route.snapshot.paramMap.get('id');
    this.jobId = idParam ? +idParam : 0;
    this.loadJob();
  }

  // Load job details by fetching all jobs and finding the correct one
  loadJob(): void {
    this.jobService.getJobs().subscribe((jobs: any[]) => {
      this.job = jobs.find(j => j.id === this.jobId);
      if (!this.job) {
        alert('Job not found');
      }
    });
  }

  // Capture file input
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.resumeFile = event.target.files[0];
    }
  }

  // Submit application
  apply(): void {
    if (!this.resumeFile) {
      alert('Please select a resume file.');
      return;
    }

    this.jobService.apply(this.jobId, this.resumeFile).subscribe((res: any) => {
      if (res.status) {
        alert('Application submitted successfully!');
      } else {
        alert(res.error || 'Application failed.');
      }
    }, error => {
      console.error(error);
      alert('Error submitting application.');
    });
  }
}
