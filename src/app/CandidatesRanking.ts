export class CandidatesRanking {
    nome: string = '';
    profissao: string = '';
    localizacao: string = '';
    nivel: number;
    score: number;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
