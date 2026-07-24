 // dados.js — busca as vagas e gerencia o localStorage

import { VagaFrontEnd } from "./motor.js";

// FETCH — busca as vagas do arquivo JSON com os 3 estados
export const carregarVagas = async () => {

  // Estado 1: carregando
  const secaoResultados = document.getElementById("resultados");
  secaoResultados.innerHTML = "<p>Carregando vagas...</p>";

  try {
    const response = await fetch("./assets/dados/vagas.json");

    // Verifica se a resposta foi ok
    if (!response.ok) {
      throw new Error("Erro ao buscar as vagas.");
    }

    const dados = await response.json();

    // Estado 2: vazio — nenhuma vaga encontrada
    if (dados.length === 0) {
      secaoResultados.innerHTML = "<p>Nenhuma vaga encontrada.</p>";
      return [];
    }

    // map — transforma cada objeto do JSON numa instância de VagaFrontEnd
    const vagas = dados.map(v =>
      new VagaFrontEnd(v.id, v.empresa, v.cargo, v.requisitos, v.salario, v.modalidade)
    );

    return vagas;

  } catch (erro) {
    // Estado 3: erro — algo deu errado na busca
    secaoResultados.innerHTML = `<p role="alert">Erro ao carregar as vagas: ${erro.message}</p>`;
    return [];
  }
};

// LOCALSTORAGE — salva o perfil do candidato
export const salvarPerfil = (candidato) => {
  localStorage.setItem("perfil", JSON.stringify(candidato));
};

// LOCALSTORAGE — recupera o perfil salvo
export const recuperarPerfil = () => {
  const salvo = localStorage.getItem("perfil");

  // trata o null da primeira visita
  if (salvo === null) return null;

  return JSON.parse(salvo);
};