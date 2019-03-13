Documentação e instruções sobre o 'Desafio para Engenheiro(a) de Software - VAGAS.com':

1) Introdução

Construi toda a solução utilizando Angular, sendo a implementação da logica feita em Typescript. Como nos ultimos anos trabalhei com C/C++ e Java na Ericsson, decidi implementar como uma solução front-end pois estou aprendendo Angular desde dezembro de 2018, e o teste me trouxe a chance de aprender ainda mais e aprofundar meus estudos.

Utilizei como back-end da solução o JSON-SERVER, cuja documentação pode ser encontrar neste link:
https://github.com/typicode/json-server#access-from-anywhere . Através desse 'fake' back-end pude construir a escrita e leitura dos JSONs relativos aos candidatos, vagas em que se aplicaram e o ranking dos candidatos baseados em suas pontuações. As operações rests estarão disponiveis por meio dos seguintes end-points:

REST APIs para as operações de leitura/escrita, POSTs e GETs:

http://localhost:3000/jobs

http://localhost:3000/candidates 

http://localhost:3000/jobApplications 

http://localhost:3000/candidatesRanking 

O arquivo db.json é responsavel por armazenar todos os dados gerados pelos POSTs, cadastro das vagas, candidatos e candidaturas. O JSON-SERVER gera ids automaticamente para cada novo POST executado. Para o candidatesRanking é armazendo o resultado dos canditados e suas pontuações, em orderm decrescente. 

2) Arquitetura

O Angular estabelece uma aquitetura onde é possivel organizar um projeto adotando modulos, e dentro deles, componentes que podem ser reutilizados. Através dos componentes, que são classes, podemos definir serviços, como no caso dos seguintes serviços implementados no teste VAGAS.com: 'JobApplicationsApiService', 'CandidatesApiService', 'JobsApiService', que representam, respectivamente, os serviços relacionados as candidaturas, as funçõs relacionadas aos candidatos, como getAllCandidates e createCandidateForRanking e as funções que lidam com as vagas, dentre outras.

'AppModule' pode ser considerada a class main e é nela que declaro todas as dependencias do projeto, como o componente 'AppComponent' onde foi implementado a maior parte das funcionalidades do projeto, como os calculos de distancia, pontuações, ordenação e criação do ranking dos candidatos, leitura e escrita dos dados (candidatos, vagas e candidaturas), usando o back-end e suas REST-APIs. Em Angular e neste projeto é utilizado o conceito de 'Observables', que consiste na comunicação entre front-end e back-end de forma assincrona, onde os dados são recuperados a medida que novas informações são fornecidas pelo back-end.

Durante a execução do APP mantenho em memoria todas os dados fornecidos nos seguintes arrays dos objetos que representam cada entidade da solução, jobs, candidates, jobApplications e os rankingCandidates:

  jobs: Job[] = [];
  
  candidates: Candidate[] = [];
  
  jobApplications: JobApplication[] = [];
  
  rankingCandidates: CandidatesRanking[] = [];
  
O construtor do componente principal, AppComponent, declara através de injeção de dependencia os serviços que uso no componente, tais como os ApiServices utilizados para comunica com o back-end, por meio das RESTs APIs.

ngOnInit e o construtor são executados como ponto de partida do APP e a execução se dá quando o usuario clica no botão, 'CLASSIFICAR CANDIDATOS', através da pagina inicial do app, cujo link é: https://cardosojvictor.github.io/poc-vagas.com/

Implementei o componente DijkstraAlgorithmComponent para o calculo da distancia entre o candidado e a vaga. Os vertices e as distancias foram definidos dentro desse componente conforme o grafo apresentado no desafio.

Classes auxiliares foram definidas para abarcar os dados das entidades do desafio, tais como 'Candidate', 'Job', 'JobApplication' e 'CandidatesRanking'. Esses objetos são usados pelos vetores para guardar todos os dados do ap durante a execução.

app.component.html é onde está defindo uma interface simples para rodar a aplicação. Nesse .html é exibido informações sobre o app e o botão 'CLASSIFICAR CANDITADOS', que chama a função orderCandidatesForJobs().

3) Como executar o App

Após a criação dos candidatos, das vagas disponiveis e das candidaturas, enquando o back-end JSON-SERVER esteja rodando e o arquivo db.json presente na pasta src/app/db.json, pode-se clicar no botão 'CLASSIFICAR CANDIDATOS'. Ao clicar no botão a função principal orderCandidatesForJobs() é deflagrada e os dados gerados pela classificção dos candidatos, de acordo com as pontuações obtidas, são gravados no arquivo db.json, para futura consulta pelo REST http://localhost:3000/candidatesRanking .

4) REST APIs - Criação das vagas, candidatos e candidaturas

4.1) Criação de Vagas - POST => localhost:3000/jobs/

	{
      "empresa": "VAGAS.COM",
      "titulo": "Software Engineer",
      "descricao": "Criar uma classificador de candidatos",
      "localizacao": "D",
      "nivel": 5
    }

Para criar uma nova vaga, o modelo acima pode ser usado, inserindo os dados como no exemplo. Na resposta dessa execução, as mesmas informações são exibidas com o acrescimo do ID gerado para a vaga em questão. Os IDs são criados de formado sequencial pelo JSON-SERVER.

4.2) Inserção dos novos candidatos - POST => localhost:3000/candidates/

    {
        "nome": "Jose Cardoso",
        "profissao": "Software Engineer",
        "localizacao": "D",
        "nivel": 5
    }

Para a inserção de novos candidatos basta usar o modelo acima, executando o POST. A resposta é exibida e o novo ID para o candidato corrente é mostrado.

4.3) Criação das candidaturas - POST => localhost:3000/jobApplications

	{
		"id_vaga": 5,
		"id_pessoa": 7
	}

Ao rodar o POST acima uma nova candidatura é criada e o ID correspondente é gerado.

5) Execução do APP - https://cardosojvictor.github.io/poc-vagas.com/

Após a criação de todos os dados, dos candidatos, vagas e candidaturas, agora chegou o momento de rodar o app. Basta acessar o link acima, o deploy foi feito no GITHUB.

Ao clicar no botão 'CLASSIFICAR CANDIDATOS' o resultado é gerado e pode ser conferido através de um GET em:
http://localhost:3000/candidatesRanking

***LIMITAÇÕES:

Pode ser criado diversas vagas e varios candidatos podem se aplicar a elas. O GET do ranking dos candidatos estão concentrados em um unico end-point, o candidatesRanking, trazendo os resultados de todas as vagas e suas candidaturas. Preciso investigar como fazer a criação de novos trechos no arquivo db.json segmentados pelas vagas.


6) Instalação do fake back-end JSON-SERVER

Segue em anexo neste email todo o projeto em um arquivo compactado. A raiz do projeto é a pasta poc-vagas/ e nela contém o arquivo db.json, onde todos os dados são gravados e usados pelos GETs e POSTs.

Para subir o JSON-SERVER é necessario instalar o NODE.js na maquina. Tendo disponivel o NODE.js, basta rodar o seguinte comando na pasta poc-vagas/ (pasta raiz do proheto e onde está o db.json):

=> json-server --watch db.json
