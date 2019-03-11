/*
I adapted the the code concerning the Dijstra algorithm from the following gitHub repository:
https://github.com/SergeiGalkovskii/Dijkstra-s-algorithm-implementation-typescript

I created the following component to calculate the distance 
and also configured the graph nodes according to the exercise description. 
All the localities are represented below using the vertices object and the addVertex function.
*/
import { Component, OnInit } from '@angular/core';

import { NodeVertex } from './nodeVertex';
import { Vertex } from './vertex';

@Component({
  selector: 'app-dijkstra-algorithm',
  templateUrl: './dijkstra-algorithm.component.html',
  styleUrls: ['./dijkstra-algorithm.component.css']
})
export class DijkstraAlgorithmComponent implements OnInit {
  
  vertices: any;
  constructor() {
      this.vertices = {};

      this.addVertex(new Vertex("A", [{ nameOfVertex: "B", weight: 5 }], 1));
	  
      this.addVertex(new Vertex("B", [{ nameOfVertex: "A", weight: 5 }, { nameOfVertex: "C", weight: 7 }, { nameOfVertex: "D", weight: 3 }], 1)); 
   
      this.addVertex(new Vertex("C", [{ nameOfVertex: "B", weight: 7 }, { nameOfVertex: "E", weight: 4 }], 1));
        
      this.addVertex(new Vertex("D", [{ nameOfVertex: "B", weight: 3 }, { nameOfVertex: "E", weight: 10 }, { nameOfVertex: "F", weight: 8 }], 1));
        
      this.addVertex(new Vertex("E", [{ nameOfVertex: "C", weight: 4 }, { nameOfVertex: "D", weight: 10 }], 1));
        
      this.addVertex(new Vertex("F", [{ nameOfVertex: "D", weight: 8 }], 1));
  }

  ngOnInit() {
  }

  addVertex(vertex: Vertex): void {
      this.vertices[vertex.name] = vertex;
  }

  findShortestWay(start: string, finish: string): number {

      let nodes: any = {};

      for (let i in this.vertices) {
          if (this.vertices[i].name === start) {
              this.vertices[i].weight = 0;

          } else {
              this.vertices[i].weight = Number.MAX_VALUE;
          }
          nodes[this.vertices[i].name] = this.vertices[i].weight;
      }

      while (Object.keys(nodes).length !== 0) {
          let sortedVisitedByWeight: string[] = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight);
          let currentVertex: Vertex = this.vertices[sortedVisitedByWeight[0]];
          for (let j of currentVertex.nodes) {
              const calculateWeight: number = currentVertex.weight + j.weight;
              if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
                  this.vertices[j.nameOfVertex].weight = calculateWeight;
              }
          }
          delete nodes[sortedVisitedByWeight[0]];
      }
      const finishWeight: number = this.vertices[finish].weight;
      return finishWeight;
  }
}