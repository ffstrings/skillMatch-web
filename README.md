 SkillMatch JS — Web

Simulador de Compatibilidade de Curriculo — Versao Web

Sobre o projeto

O SkillMatch JS evoluiu de um script de console para uma aplicacao web completa. O usuario preenche seu perfil diretamente na pagina, o sistema busca as vagas, calcula a compatibilidade e exibe os resultados em cards organizados.

O sistema analisa:

Quais habilidades o candidato possui
Quais habilidades cada vaga exige
Quais habilidades estao faltando
O percentual de compatibilidade com cada vaga
Qual vaga tem maior compatibilidade
Qual recomendacao de estudo deve ser dada
Como executar
Clone o repositorio:
git clone https://github.com/ffstrings/skillMatch-web.git
Abra a pasta no VS Code
Instale a extensao Live Server (se ainda nao tiver)
Clique com botao direito no index.html e escolha Open with Live Server
Acesse no navegador: 127.0.0.1:5500

Importante: o projeto usa fetch e modulos ES, por isso nao funciona abrindo o arquivo direto no navegador. Use o Live Server ou outro servidor local.

Estrutura do projeto
skillmatch-web/
+-- index.html
+-- README.md
+-- assets/
    +-- styles/
    |   +-- index.style.css
    +-- scripts/
    |   +-- main.js
    |   +-- motor.js
    |   +-- ui.js
    |   +-- dados.js
    +-- dados/
    |   +-- vagas.json
    +-- img/
        +-- logo.svg
Tecnologias e conceitos utilizados

HTML

Estrutura semantica com header, main, section e footer
Formulario com label/for, aria-label e aria-live
SEO com title descritivo e meta description
Acessibilidade com lang, alt em imagens e foco visivel

CSS

Variaveis CSS com :root
Layout com Flexbox e flex-wrap para os cards
Responsividade mobile-first com media queries
Box model, unidades relativas e transicoes

JavaScript — conceitos do semestre

Arrays e objetos Os dados do candidato e das vagas sao organizados em objetos e arrays.

Arrow functions Funcoes escritas de forma moderna com =>

Metodos de array (minimo 3)

filter() — filtra requisitos que o candidato possui ou nao possui
map() — percorre vagas e transforma dados do JSON em instancias de classe
reduce() — encontra a vaga com maior compatibilidade
includes() — verifica se uma habilidade esta na lista

Classes e heranca (POO) A classe Vaga define o molde base. A classe VagaFrontEnd herda tudo dela e adiciona o campo nivel.

if/else Classifica a compatibilidade em Alta, Media ou Baixa.

Closure A funcao criarAnalisador recebe o candidato e retorna uma funcao que ja o lembra, contando tambem o total de analises feitas na sessao.

Promise e async/await Usado no fetch para buscar as vagas do arquivo vagas.json, tratando os tres estados: carregando, vazio e erro.

Laco for...of Percorre os resultados e gera os cards na tela.

Modulos ES (import/export) O JavaScript esta dividido em 4 modulos:

motor.js — regras de compatibilidade
ui.js — renderizacao dos cards no DOM
dados.js — fetch e localStorage
main.js — ponto de entrada, liga tudo

DOM e eventos

addEventListener para capturar o formulario
preventDefault para impedir o reload da pagina
createElement e classList para gerar os cards dinamicamente
Validacao de campos obrigatorios com feedback de erro

localStorage Salva o perfil do candidato entre sessoes com JSON.stringify e JSON.parse, tratando o null da primeira visita.

Exemplo de uso
Preencha seu nome, area e habilidades separadas por virgula
Clique em Analisar compatibilidade
Os cards aparecem com o percentual de cada vaga
A melhor vaga fica destacada com borda
Uma recomendacao de estudos e gerada com base nas habilidades faltantes
Seu perfil e salvo automaticamente para a proxima visita
Links do projeto
Repositorio: https://github.com/ffstrings/skillMatch-web
Kanban: (adicione o link do seu GitHub Projects aqui)
Video de apresentacao: (adicione o link do YouTube ou Google Drive aqui)
Desenvolvido por

ffstrings — estudante de desenvolvimento Front-End. Projeto desenvolvido como desafio pratico do Modulo 01.