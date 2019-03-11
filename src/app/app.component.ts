import { Component, OnInit } from '@angular/core';

import { Job } from './Job';
import { JobsApiService } from './jobs-api.service';
import { CandidatesApiService } from './candidates-api.service';
import { JobApplicationsApiService } from './job-applications-api.service';
import { Candidate } from './Candidate';
import { JobApplication } from './JobApplication';
import { DijkstraAlgorithmComponent } from './dijkstra-algorithm/dijkstra-algorithm.component';

import { CandidatesRanking } from './CandidatesRanking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JobsApiService, CandidatesApiService,
    JobApplicationsApiService,
    DijkstraAlgorithmComponent]
})
export class AppComponent implements OnInit{
  title = 'app';

  jobs: Job[] = [];
  candidates: Candidate[] = [];
  jobApplications: JobApplication[] = [];
  rankingCandidates: CandidatesRanking[] = [];

  constructor(
    private jobsApiService: JobsApiService,
    private candidatesApiService: CandidatesApiService,
    private jobApplicationsApiService: JobApplicationsApiService) { }

    public ngOnInit() {
      this.loadData();      
    }

  private loadData() {
    this.jobsApiService
      .getAllJobs()
      .subscribe((jobsFromDbJson) => {
          this.jobs = this.jobs.concat(jobsFromDbJson.slice(this.jobs.length, jobsFromDbJson.length));
      });

    this.candidatesApiService
      .getAllCandidates()
      .subscribe((candidatesFromDbJson) => {
        this.candidates = this.candidates.concat(candidatesFromDbJson.slice
          (this.candidates.length, candidatesFromDbJson.length));
      });

    this.jobApplicationsApiService
      .getAllJobApplications()
      .subscribe((jobApplicationsFromDbJson) => {
          this.jobApplications = this.jobApplications.concat(jobApplicationsFromDbJson.slice
            (this.jobApplications.length, jobApplicationsFromDbJson.length));
      });
  }

  public orderCandidatesForJobs() 
  {
    this.loadData();
    for (let index = 0; index < this.jobApplications.length; index++) 
    {
      if(!this.jobApplications[index].alreadyProcessed)
      {
        const currentJobApplication = this.jobApplications[index];
        let candidate: Candidate = this.candidates.find((t) => t.id === currentJobApplication.id_pessoa);
        let job: Job = this.jobs.find((t) => t.id === currentJobApplication.id_vaga);

        let candidateScore: number = this.calculateCandidateScore
          (candidate.localizacao,
            job.localizacao,
            currentJobApplication.id_pessoa,
            currentJobApplication.id_vaga
          );

        var rankingCandidate: CandidatesRanking = 
                                {
                                  nome: candidate.nome,
                                  profissao: candidate.profissao,
                                  localizacao: candidate.localizacao,
                                  nivel: candidate.nivel,
                                  score: Math.trunc(candidateScore)
                                };

        this.rankingCandidates.push(rankingCandidate);
        this.jobApplications[index].alreadyProcessed = true; 
      }
      else
      {
        this.rankingCandidates = this.rankingCandidates.splice(index,1);
      }
    }
    
    this.orderCandidatesAndCreateRanking(this.rankingCandidates);
  }

  public orderCandidatesAndCreateRanking(pRankingCandidate: CandidatesRanking[])
  {
    var postData: string;

    pRankingCandidate.sort((leftSide, rightSide): number => {
      if( leftSide.score > rightSide.score ) return -1;
      if( leftSide.score < rightSide.score ) return 1;
      return 0;
    });
    
    for (let index = 0; index < pRankingCandidate.length; index++) 
    {
      this.candidatesApiService.createCandidateForRanking(pRankingCandidate[index]).subscribe(
        (rankingCandidate) => {
          postData = JSON.stringify(rankingCandidate) 
      });

    // for debugging purpose
    console.log("Ranking Candidate: " + pRankingCandidate[index].nome + " " + pRankingCandidate[index].profissao
    + " " + pRankingCandidate[index].localizacao + " " + pRankingCandidate[index].nivel + " " + pRankingCandidate[index].score);
    }
  }

  public calculateCandidateScore(pCandidateLocality: string,
    pJobLocality: string,
    pIdCandidate: number,
    pIdJob: number): number {
    let dijkstra = new DijkstraAlgorithmComponent();

    let distance: number = dijkstra.findShortestWay(pCandidateLocality, pJobLocality);
    let points: number = this.pointsDistanceCandidateAndJob(distance);

    console.log("Distance and points: " + distance + " " + points);

    return ((this.experienceLevel(pIdJob, pIdCandidate) + points) / 2);
  }

  public experienceLevel(pIdJob: number, pIdCandidate: number): number {
    let job = this.jobs.find((t) => t.id === pIdJob);
    let candidate = this.candidates.find((t) => t.id === pIdCandidate);

    return 100 - 25 * Math.abs(job.nivel - candidate.nivel);
  }

  public pointsDistanceCandidateAndJob(score: number): number {
    if (score <= 5) {
      return 100;
    }
    else if (score > 5 && score <= 10) {
      return 75;
    }
    else if (score > 10 && score <= 15) {
      return 50;
    }
    else if (score > 15 && score <= 20) {
      return 25;
    }

    return 0;
  }
}
