 // motor.js — regras de compatibilidade (o cérebro do SkillMatch)

// Classe pai
export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa}`;
  }
}

// Classe filha — herda de Vaga e adiciona o nivel
export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel = "júnior") {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível: ${this.nivel}`;
  }
}

// Closure — cria um analisador que lembra do candidato
export const criarAnalisador = (candidato) => {
  let totalAnalises = 0; // contador de análises da sessão

  return (vaga) => {
    totalAnalises++;

    // filter — habilidades que o candidato TEM
    const encontradas = vaga.requisitos.filter(req =>
      candidato.habilidades.includes(req)
    );

    // filter invertido — habilidades que o candidato NAO TEM
    const faltando = vaga.requisitos.filter(req =>
      !candidato.habilidades.includes(req)
    );

    // calcula o percentual
    const percentual = Math.round((encontradas.length / vaga.requisitos.length) * 100);

    // if/else — classifica a compatibilidade
    let classificacao;
    if (percentual >= 80) {
      classificacao = "Alta";
    } else if (percentual >= 50) {
      classificacao = "Média";
    } else {
      classificacao = "Baixa";
    }

    return {
      vaga,
      encontradas,
      faltando,
      percentual,
      classificacao,
      totalAnalises
    };
  };
};

// Encontra a melhor vaga usando reduce
export const encontrarMelhorVaga = (resultados) => {
  return resultados.reduce((melhor, atual) =>
    atual.percentual > melhor.percentual ? atual : melhor
  );
};

// Gera recomendacao de estudos
export const gerarRecomendacao = (resultados) => {
  // map — pega todas as habilidades faltando de todas as vagas
  const todasFaltando = resultados.map(r => r.faltando).flat();

  // filter — remove duplicatas
  const unicas = todasFaltando.filter((hab, index) =>
    todasFaltando.indexOf(hab) === index
  );

  if (unicas.length === 0) {
    return "Você está pronta para todas as vagas!";
  }

  return `Para aumentar sua compatibilidade, estude: ${unicas.join(", ")}.`;
};