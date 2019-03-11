export class JobApplication {
    id: number;
    id_vaga: number;
    id_pessoa: number;
    alreadyProcessed: boolean = false;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}