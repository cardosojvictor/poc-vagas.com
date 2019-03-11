export class Job {
    id: number;
    empresa: string = '';
    titulo: string = '';
    descricao: string = '';
    localizacao: string = '';
    nivel: number;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
