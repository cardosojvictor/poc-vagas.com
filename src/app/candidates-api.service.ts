import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Candidate } from './Candidate';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CandidatesRanking } from './CandidatesRanking';

const API_URL = environment.apiUrl;

@Injectable()
export class CandidatesApiService {

  constructor(private http: Http) { }

    // API: GET /candidates
    public getAllCandidates(): Observable<Candidate[]>
    {
      return this.http
        .get(API_URL + '/candidates')
        .map(response => {
          const candidates = response.json();
          return candidates.map((candidate) => new Candidate(candidate));
        })
        .catch(this.handleError);
    }
  
    // API: GET /candidates/:id
    public getCandidateById(candidateId: number) {
      return this.http
      .get(API_URL + '/candidates/' + candidateId)
      .map(response => {
        return new Candidate(response.json());
      })
      .catch(this.handleError);
    }

    public createCandidateForRanking(candidateRanking: CandidatesRanking): 
    Observable<CandidatesRanking> 
    {
      return this.http
        .post(API_URL + '/candidatesRanking', candidateRanking)
        .map(response => {
          return new CandidatesRanking(response.json());
        })
        .catch(this.handleError);
    }

    public deleteCandidatesFromRanking(candidateId: number): Observable<null> {
      return this.http
        .delete(API_URL + '/candidatesRanking/' + candidateId)
        .map(response => null)
        .catch(this.handleError);
    }

    private handleError (error: Response | any) {
      console.error('CandidatesApiService::handleError', error);
      return Observable.throw(error);
    }

}
