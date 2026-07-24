 // ui.js — tudo que aparece na tela

import { criarAnalisador, encontrarMelhorVaga, gerarRecomendacao } from "./motor.js";

// Renderiza os cards de resultado na tela
export const renderizarResultados = (vagas, candidato) => {
  const secao = document.getElementById("resultados");
  secao.innerHTML = ""; // limpa o conteúdo anterior

  // cria o analisador passando o candidato (closure)
  const analisar = criarAnalisador(candidato);

  // map — gera um resultado para cada vaga
  const resultados = vagas.map(vaga => analisar(vaga));

  // verifica se nenhuma vaga foi encontrada
  if (resultados.length === 0) {
    secao.innerHTML = "<p>Nenhuma vaga encontrada.</p>";
    return;
  }

  // encontra a melhor vaga
  const melhor = encontrarMelhorVaga(resultados);

  // recomendacao de estudos
  const recomendacao = gerarRecomendacao(resultados);

  // for...of — percorre cada resultado e cria um card
  for (const resultado of resultados) {
    const card = document.createElement("article");
    card.classList.add("card-vaga");

    // destaca a melhor vaga
    if (resultado.vaga.id === melhor.vaga.id) {
      card.classList.add("melhor-vaga");
    }

    // define a cor da classificacao
    card.classList.add(`classificacao-${resultado.classificacao.toLowerCase()}`);

    card.innerHTML = `
      <h3>${resultado.vaga.cargo}</h3>
      <p><strong>Empresa:</strong> ${resultado.vaga.empresa}</p>
      <p><strong>Salário:</strong> R$ ${resultado.vaga.salario}</p>
      <p><strong>Modalidade:</strong> ${resultado.vaga.modalidade}</p>
      <p><strong>Nível:</strong> ${resultado.vaga.exibirNivel()}</p>
      <div class="compatibilidade">
        <span class="percentual">${resultado.percentual}%</span>
        <span class="classificacao">${resultado.classificacao}</span>
      </div>
      <div class="habilidades">
        <p><strong>Você tem:</strong> ${resultado.encontradas.join(", ") || "Nenhuma"}</p>
        <p><strong>Faltando:</strong> ${resultado.faltando.join(", ") || "Nada"}</p>
      </div>
    `;

    secao.appendChild(card);
  }

  // exibe a recomendacao de estudos
  const divRecomendacao = document.createElement("div");
  divRecomendacao.classList.add("recomendacao");
  divRecomendacao.innerHTML = `
    <h3>Melhor vaga para voce: ${melhor.vaga.cargo} na ${melhor.vaga.empresa} (${melhor.percentual}%)</h3>
    <p>${recomendacao}</p>
  `;
  secao.appendChild(divRecomendacao);
};

// Preenche o formulario com o perfil salvo no localStorage
export const preencherFormulario = (perfil) => {
  if (!perfil) return; // primeira visita, nao faz nada

  document.getElementById("nome").value = perfil.nome;
  document.getElementById("area").value = perfil.area;
  document.getElementById("habilidades").value = perfil.habilidades.join(", ");
  document.getElementById("experiencia").value = perfil.experienciaMeses;
};