 // main.js — ponto de entrada, liga todos os módulos

import { carregarVagas, salvarPerfil, recuperarPerfil } from "./dados.js";
import { renderizarResultados, preencherFormulario } from "./ui.js";

// aguarda a página carregar completamente antes de executar
document.addEventListener("DOMContentLoaded", async () => {

  // tenta recuperar o perfil salvo no localStorage
  const perfilSalvo = recuperarPerfil();

  // se tiver perfil salvo, preenche o formulário automaticamente
  preencherFormulario(perfilSalvo);

  // captura o formulário
  const form = document.getElementById("form-perfil");

  // addEventListener — escuta o envio do formulário
  form.addEventListener("submit", async (evento) => {

    // preventDefault — impede o reload da página
    evento.preventDefault();

    // limpa erros anteriores
    document.getElementById("erro-nome").textContent = "";
    document.getElementById("erro-area").textContent = "";
    document.getElementById("erro-habilidades").textContent = "";

    // captura os valores do formulário
    const nome = document.getElementById("nome").value.trim();
    const area = document.getElementById("area").value.trim();
    const habilidadesTexto = document.getElementById("habilidades").value.trim();
    const experiencia = document.getElementById("experiencia").value;

    // validação — campos obrigatórios
    let valido = true;

    if (!nome) {
      document.getElementById("erro-nome").textContent = "Nome é obrigatório.";
      valido = false;
    }

    if (!area) {
      document.getElementById("erro-area").textContent = "Área é obrigatória.";
      valido = false;
    }

    if (!habilidadesTexto) {
      document.getElementById("erro-habilidades").textContent = "Informe pelo menos uma habilidade.";
      valido = false;
    }

    // se algum campo inválido, para aqui
    if (!valido) return;

    // monta o objeto candidato
    const candidato = {
      nome,
      area,
      habilidades: habilidadesTexto.split(",").map(h => h.trim()),
      experienciaMeses: Number(experiencia) || 0
    };

    // salva o perfil no localStorage
    salvarPerfil(candidato);

    // carrega as vagas e renderiza os resultados
    const vagas = await carregarVagas();
    renderizarResultados(vagas, candidato);
  });
});