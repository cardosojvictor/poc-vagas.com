import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { JobApplication } from './JobApplication';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class JobApplicationsApiService {

  constructor(private http: Http) { }

  // API: GET /jobApplications
  public getAllJobApplications(): Observable<JobApplication[]>
  {
    return this.http
      .get(API_URL + '/jobApplications')
      .map(response => {
        const jobApplications = response.json();
        return jobApplications.map((jobApplication) => new JobApplication(jobApplication));
      })
      .catch(this.handleError);
  }

  // API: GET /jobApplications/:id
  public getJobApplicationById(jobApplicationId: number) {
    return this.http
    .get(API_URL + '/jobApplications/' + jobApplicationId)
    .map(response => {
      return new JobApplication(response.json());
    })
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('JobApplicationsApiService::handleError', error);
    return Observable.throw(error);
  }

}
