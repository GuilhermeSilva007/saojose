const inicioQuiz = document.getElementById("inicioQuiz");
const areaPerguntas = document.getElementById("areaPerguntas");
const formulario = document.getElementById("quizForm");
const perguntaAtual = document.getElementById("perguntaAtual");

const resultado = document.getElementById("resultado");
const pontuacao = document.getElementById("pontuacao");
const mensagemResultado = document.getElementById("mensagemResultado");

const botaoComecar = document.getElementById("botaoComecar");
const botaoReiniciar = document.getElementById("botaoReiniciar");

const progressoTexto = document.getElementById("progressoTexto");
const progressoBarra = document.getElementById("progressoBarra");
const numeroAtual = document.getElementById("numeroAtual");
const listaRanking = document.getElementById("listaRanking");

const armazenamento = "rankingQuizJoselito";
const URL_RANKING =
  "https://script.google.com/macros/s/AKfycbyl6QhvuUNAt8ptEdtW228SSXTfXMyl9nhuWaheRRtk2o63ZyQFB9Evpo60buWyGIkM3A/exec";

let indiceAtual = 0;
let acertos = 0;
let participante = "";
let respondendo = false;


const perguntas = [
  {
    pergunta:
      "Em que ano São José Sánchez del Río foi canonizado pela Igreja Católica?",
    alternativas: ["2005", "2013", "2016", "2018"],
    correta: 2,
  },
  {
    pergunta:
      "Em que ano nasceu São José Sánchez del Río, na cidade de Sahuayo?",
    alternativas: ["1908", "1913", "1917", "1920"],
    correta: 1,
  },
  {
    pergunta:
      "Em qual dia do calendário litúrgico celebramos a memória de São José Sánchez del Río?",
    alternativas: [
      "10 de fevereiro",
      "16 de outubro",
      "20 de novembro",
      "28 de março",
    ],
    correta: 0,
  },
  {
    pergunta:
      "Qual país foi o local de nascimento de São José Sánchez del Río?",
    alternativas: ["Espanha", "Colômbia", "México", "Argentina"],
    correta: 2,
  },
  {
    pergunta: "Quantos anos São José Sánchez del Río tinha quando morreu?",
    alternativas: ["12 anos", "13 anos", "14 anos", "15 anos"],
    correta: 2,
  },
  {
    pergunta: "Em que ano aconteceu a morte de São José Sánchez del Río?",
    alternativas: ["1925", "1926", "1928", "1930"],
    correta: 2,
  },
  {
    pergunta:
      "Qual pontífice realizou a canonização de São José Sánchez del Río?",
    alternativas: [
      "Papa Bento XVI",
      "Papa João Paulo II",
      "Papa Francisco",
      "Papa Pio XI",
    ],
    correta: 2,
  },
  {
    pergunta:
      "Em qual período ocorreu a Guerra Cristera, conflito ligado à história de São José?",
    alternativas: ["1910 a 1913", "1926 a 1929", "1936 a 1939", "1940 a 1945"],
    correta: 1,
  },
  {
    pergunta:
      "Qual virtude se destacou especialmente no testemunho de vida de São José Sánchez del Río?",
    alternativas: [
      "A ambição por poder",
      "A coragem e a fidelidade a Cristo",
      "A busca por reconhecimento público",
      "A habilidade militar",
    ],
    correta: 1,
  },
  {
    pergunta:
      "Em qual data exata São José Sánchez del Río foi canonizado pelo Papa Francisco?",
    alternativas: [
      "20 de novembro de 2005",
      "10 de fevereiro de 2016",
      "16 de outubro de 2016",
      "28 de março de 2013",
    ],
    correta: 2,
  },
];

botaoComecar.addEventListener("click", () => {
  const campoNome = document.getElementById("nome");
  participante = campoNome.value.trim();

  if (!participante) {
    campoNome.focus();
    campoNome.reportValidity();
    return;
  }

  inicioQuiz.hidden = true;
  areaPerguntas.hidden = false;

  indiceAtual = 0;
  acertos = 0;

  mostrarPergunta();
});

function mostrarPergunta() {
  respondendo = false;

  const pergunta = perguntas[indiceAtual];

  numeroAtual.textContent = `Pergunta ${indiceAtual + 1} de 10`;

  const porcentagem = (indiceAtual / perguntas.length) * 100;

  progressoTexto.textContent = `${Math.round(porcentagem)}% concluído`;
  progressoBarra.style.width = `${porcentagem}%`;

  perguntaAtual.innerHTML = `
    <div class="pergunta-atual">
      <span class="numero-pergunta">
        PERGUNTA ${String(indiceAtual + 1).padStart(2, "0")}
      </span>

      <h4>${pergunta.pergunta}</h4>

      <div class="alternativas">
        ${pergunta.alternativas
          .map(
            (alternativa, indice) => `
          <button
            type="button"
            class="alternativa"
            data-indice="${indice}"
          >
            <span class="letra-alternativa">
              ${String.fromCharCode(65 + indice)}
            </span>
            <span>${alternativa}</span>
          </button>
        `,
          )
          .join("")}
      </div>
    </div>
  `;

  perguntaAtual.querySelectorAll(".alternativa").forEach((botao) => {
    botao.addEventListener("click", () => selecionarResposta(botao));
  });
}

function selecionarResposta(botao) {
  if (respondendo) return;

  respondendo = true;

  const resposta = Number(botao.dataset.indice);
  const correta = perguntas[indiceAtual].correta;

  perguntaAtual.querySelectorAll(".alternativa").forEach((opcao) => {
    opcao.disabled = true;
  });

  botao.classList.add("selecionada");

  if (resposta === correta) {
    acertos++;
  }

  setTimeout(() => {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      finalizarQuiz();
    }
  }, 650);
}

function finalizarQuiz() {
  progressoBarra.style.width = "100%";
  progressoTexto.textContent = "100% concluído";
  numeroAtual.textContent = "Desafio concluído";

  areaPerguntas.hidden = true;
  resultado.hidden = false;

  pontuacao.textContent = `${acertos}/10`;

  if (acertos === 10) {
    mensagemResultado.textContent =
      "Excelente! Você demonstrou conhecer profundamente a história de São José Sánchez del Río.";
  } else if (acertos >= 7) {
    mensagemResultado.textContent =
      "Muito bem! Você conhece bastante sobre a vida e o testemunho de Joselito.";
  } else if (acertos >= 4) {
    mensagemResultado.textContent =
      "Bom trabalho! Continue aprendendo sobre a história deste jovem santo.";
  } else {
    mensagemResultado.textContent =
      "Continue estudando! A história de São José Sánchez del Río tem muito a ensinar.";
  }

  salvarParticipante(participante, acertos);
}

function obterRanking() {
  return new Promise((resolve, reject) => {
    const callback = "rankingCallback_" + Date.now();
    const script = document.createElement("script");

    window[callback] = (ranking) => {
      delete window[callback];
      script.remove();
      resolve(ranking);
    };

    script.src = `${URL_RANKING}?callback=${callback}`;

    script.onerror = () => {
      delete window[callback];
      script.remove();
      reject(new Error("Erro ao carregar ranking."));
    };

    document.body.appendChild(script);
  });
}

async function salvarParticipante(nome, pontos) {
  try {
    await fetch(URL_RANKING, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({ nome, pontos }),
    });

    mostrarRanking();
  } catch (erro) {
    alert("Não foi possível enviar sua pontuação.");
  }
}

async function mostrarRanking() {
  listaRanking.replaceChildren();

  const carregando = document.createElement("p");
  carregando.className = "ranking-vazio";
  carregando.textContent = "Carregando ranking...";
  listaRanking.appendChild(carregando);

  try {
    const ranking = await obterRanking();
    listaRanking.replaceChildren();

    if (!ranking.length) {
      carregando.textContent = "Seja o primeiro a participar do quiz!";
      listaRanking.appendChild(carregando);
      return;
    }

    ranking.forEach((participante, indice) => {
      const item = document.createElement("div");
      item.className = "ranking-item";

      const pessoa = document.createElement("div");
      pessoa.className = "ranking-pessoa";

      const posicao = document.createElement("span");
      posicao.className = "ranking-posicao";
      posicao.textContent = `${indice + 1}º`;

      const informacoes = document.createElement("div");

      const nome = document.createElement("div");
      nome.className = "ranking-nome";
      nome.textContent = participante.nome;

      const data = document.createElement("div");
      data.className = "ranking-data";
      data.textContent = participante.data;

      const pontos = document.createElement("span");
      pontos.className = "ranking-pontos";
      pontos.textContent = `${participante.pontos}/10`;

      informacoes.append(nome, data);
      pessoa.append(posicao, informacoes);
      item.append(pessoa, pontos);
      listaRanking.appendChild(item);
    });
  } catch (erro) {
    listaRanking.replaceChildren();

    const mensagem = document.createElement("p");
    mensagem.className = "ranking-vazio";
    mensagem.textContent = "Não foi possível carregar o ranking.";
    listaRanking.appendChild(mensagem);
  }
}

botaoReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  acertos = 0;
  participante = "";
  respondendo = false;

  document.getElementById("nome").value = "";

  resultado.hidden = true;
  areaPerguntas.hidden = true;
  inicioQuiz.hidden = false;

  progressoBarra.style.width = "0%";
  progressoTexto.textContent = "0% concluído";

  mostrarRanking();

  inicioQuiz.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

mostrarRanking();
