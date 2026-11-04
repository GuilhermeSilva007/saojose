
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  const linksMenu = document.querySelectorAll('header nav a[href^="#"]');

  const secoes = document.querySelectorAll("main section[id]");

  const capitulos = document.querySelectorAll(
    '[class^="capitulo"], .legado, .oracao',
  );

  const imagens = document.querySelectorAll("main img");

  const detalhes = document.querySelectorAll("details");

  const estilo = document.createElement("style");

  estilo.textContent = `
    .progresso-leitura {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 0%;
      height: 3px;
      background: #c9973f;
      transition: width .1s linear;
      pointer-events: none;
    }

    .voltar-topo {
      position: fixed;
      right: 24px;
      bottom: 24px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      border: 1px solid #c9973f;
      border-radius: 50%;
      background: #5e101a;
      color: #fbf6ee;
      font-size: 21px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px);
      transition: opacity .3s ease,
                  visibility .3s ease,
                  transform .3s ease,
                  background .3s ease;
    }

    .voltar-topo.visivel {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .voltar-topo:hover {
      background: #3f0a11;
      transform: translateY(-4px);
    }

    .revelar {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity .75s ease,
                  transform .75s ease;
    }

    .revelar.apareceu {
      opacity: 1;
      transform: translateY(0);
    }

    .imagem-revelar {
      opacity: 0;
      transform: scale(.97);
      transition: opacity .8s ease,
                  transform .8s ease;
    }

    .imagem-revelar.apareceu {
      opacity: 1;
      transform: scale(1);
    }

    header nav a.secao-ativa {
      color: #9b7026;
    }

    header nav a.secao-ativa::after {
      transform: scaleX(1);
    }

    @media (max-width: 600px) {
      .voltar-topo {
        right: 15px;
        bottom: 15px;
        width: 42px;
        height: 42px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .revelar,
      .imagem-revelar,
      .voltar-topo,
      .progresso-leitura {
        transition: none !important;
        transform: none !important;
      }
    }
  `;

  document.head.appendChild(estilo);

  const progresso = document.createElement("div");

  progresso.className = "progresso-leitura";
  progresso.setAttribute("aria-hidden", "true");

  body.appendChild(progresso);

  function atualizarProgresso() {
    const altura = document.documentElement.scrollHeight - window.innerHeight;

    if (altura <= 0) {
      progresso.style.width = "100%";
      return;
    }

    const porcentagem = (window.scrollY / altura) * 100;

    progresso.style.width = `${Math.min(100, Math.max(0, porcentagem))}%`;
  }

  window.addEventListener("scroll", atualizarProgresso, { passive: true });

  window.addEventListener("resize", atualizarProgresso);

  atualizarProgresso();

  const voltarTopo = document.createElement("button");

  voltarTopo.className = "voltar-topo";
  voltarTopo.type = "button";
  voltarTopo.innerHTML = "↑";
  voltarTopo.setAttribute("aria-label", "Voltar ao início da página");

  body.appendChild(voltarTopo);

  function verificarBotaoTopo() {
    voltarTopo.classList.toggle("visivel", window.scrollY > 400);
  }

  window.addEventListener("scroll", verificarBotaoTopo, { passive: true });

  voltarTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  verificarBotaoTopo();

  const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!movimentoReduzido && "IntersectionObserver" in window) {
    const elementosAnimados = document.querySelectorAll(
      "main section, .legado li, footer",
    );

    elementosAnimados.forEach((elemento) => {
      elemento.classList.add("revelar");
    });

    const observador = new IntersectionObserver(
      (entradas, observer) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("apareceu");

            observer.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    elementosAnimados.forEach((elemento) => {
      observador.observe(elemento);
    });
  }

  if (!movimentoReduzido && "IntersectionObserver" in window) {
    imagens.forEach((imagem) => {
      imagem.classList.add("imagem-revelar");

      if (imagem.complete) {
      } else {
        imagem.addEventListener(
          "load",
          () => imagem.classList.add("imagem-carregada"),
          { once: true },
        );
      }
    });

    const observadorImagens = new IntersectionObserver(
      (entradas, observer) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("apareceu");

            observer.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    imagens.forEach((imagem) => {
      observadorImagens.observe(imagem);
    });
  }

  if (
    secoes.length > 0 &&
    linksMenu.length > 0 &&
    "IntersectionObserver" in window
  ) {
    const observadorMenu = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            const id = entrada.target.id;

            linksMenu.forEach((link) => {
              const ativo = link.getAttribute("href") === `#${id}`;

              link.classList.toggle("secao-ativa", ativo);
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      },
    );

    secoes.forEach((secao) => {
      observadorMenu.observe(secao);
    });
  }

  linksMenu.forEach((link) => {
    link.addEventListener("click", (evento) => {
      const destino = link.getAttribute("href");

      if (!destino || destino === "#") return;

      const secao = document.querySelector(destino);

      if (!secao) return;

      evento.preventDefault();

      secao.scrollIntoView({
        behavior: movimentoReduzido ? "auto" : "smooth",
        block: "start",
      });

      history.replaceState(null, "", destino);
    });
  });

  function ajustarDetalhes() {
    const computador = window.matchMedia("(min-width: 760px)").matches;

    detalhes.forEach((detalhe) => {
      if (computador) {
        detalhe.open = true;
      } else {
        detalhe.open = false;
      }
    });
  }

  ajustarDetalhes();

  window.addEventListener("resize", ajustarDetalhes);

  if (footer) {
    const textoRodape = footer.querySelector("p");

    if (textoRodape) {
      textoRodape.textContent = `© ${new Date().getFullYear()} Todos os direitos reservados.`;
    }
  }

  const bannerTexto = document.querySelector(".texto-banner");

  const bannerImagem = document.querySelector(".img-banner");

  if (!movimentoReduzido) {
    if (bannerTexto) {
      bannerTexto.animate(
        [
          {
            opacity: 0,
            transform: "translateY(25px)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration: 900,
          easing: "ease-out",
          fill: "both",
        },
      );
    }

    if (bannerImagem) {
      bannerImagem.animate(
        [
          {
            opacity: 0,
            transform: "translateX(25px)",
          },
          {
            opacity: 1,
            transform: "translateX(0)",
          },
        ],
        {
          duration: 1000,
          delay: 150,
          easing: "ease-out",
          fill: "both",
        },
      );
    }
  }

  linksMenu.forEach((link) => {
    link.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter") {
        link.click();
      }
    });
  });

  console.log("Site de São José Sánchez del Río carregado com sucesso.");
});
