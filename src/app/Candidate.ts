export class Candidate {
    id: number;
    nome: string;
    profissao: string = '';
    localizacao: string = '';
    nivel: number;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
