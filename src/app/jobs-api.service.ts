import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Job } from './Job';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class JobsApiService {

  constructor(private http: Http) { }

      // API: GET /jobs
      public getAllJobs(): Observable<Job[]>
      {
        return this.http
          .get(API_URL + '/jobs')
          .map(response => {
            const jobs = response.json();
            return jobs.map((job) => new Job(job));
          })
          .catch(this.handleError);
      }
    
      // API: GET /jobs/:id
      public getJobById(jobId: number) {
        return this.http
        .get(API_URL + '/jobs/' + jobId)
        .map(response => {
          return new Job(response.json());
        })
        .catch(this.handleError);
      }
  
  
      private handleError (error: Response | any) {
        console.error('JobsApiService::handleError', error);
        return Observable.throw(error);
      }

}
