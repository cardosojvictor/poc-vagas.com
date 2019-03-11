import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CandidatesApiService } from './candidates-api.service';
import { JobApplicationsApiService } from './job-applications-api.service';
import { JobsApiService } from './jobs-api.service';
import { DijkstraAlgorithmComponent } from './dijkstra-algorithm/dijkstra-algorithm.component';


@NgModule({
  declarations: [
    AppComponent,
    DijkstraAlgorithmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CandidatesApiService, JobApplicationsApiService, JobsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
