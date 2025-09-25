import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  api = 'http://localhost/job-portal-backend'; // update path

  constructor(private http: HttpClient) {}

  // Get all jobs
  getJobs() {
    return this.http.get<any[]>(`${this.api}/jobs.php`);
  }

  // Apply for a job
  apply(jobId: number, file: File) {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_id', jobId.toString());
    return this.http.post(`${this.api}/apply.php`, formData);
  }
}
