```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o GSAP foi carregado
  if (typeof gsap === "undefined") {
    console.warn("GSAP não foi carregado.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Respeita quem prefere movimentos reduzidos
  const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (movimentoReduzido) return;

  // ===== CABEÇALHO =====
  gsap.from("header .logo", {
    y: -25,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from("header nav li", {
    y: -15,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    delay: 0.2,
    ease: "power2.out"
  });

  // ===== PÁGINA PRINCIPAL =====
  if (document.querySelector(".banner")) {
    gsap.from(".texto-banner > *", {
      x: -45,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.3,
      ease: "power3.out"
    });

    gsap.from(".img-banner", {
      x: 45,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out"
    });
  }

  // Capítulos da história
  gsap.utils.toArray(
    ".capituloi, .capituloii, .capituloiii, .capituloiv, .capitulov"
  ).forEach((secao) => {
    const elementos = secao.querySelectorAll("h2, h3, p, img, details");

    if (!elementos.length) return;

    gsap.from(elementos, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: secao,
        start: "top 82%",
        once: true
      }
    });
  });

  // ===== LINHA DO TEMPO =====
  if (document.querySelector(".legado")) {
    gsap.from(".legado li", {
      y: 45,
      opacity: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".legado",
        start: "top 80%",
        once: true
      }
    });
  }

  // ===== PÁGINA LEGADO =====
  if (document.querySelector(".pagina-legado")) {
    const hero = gsap.timeline();

    hero.from(".legado-hero .hero-texto > *", {
      x: -40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power3.out"
    });

    hero.from(".legado-hero .hero-imagem img", {
      x: 45,
      opacity: 0,
      scale: 0.96,
      duration: 1.1,
      ease: "power3.out"
    }, "-=0.6");

    // Seções de conteúdo
    gsap.utils.toArray(".legado-secao").forEach((secao) => {
      const texto = secao.querySelector(".legado-texto");
      const imagem = secao.querySelector(".legado-imagem img");

      if (texto) {
        gsap.from(texto, {
          y: 45,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: secao,
            start: "top 80%",
            once: true
          }
        });
      }

      if (imagem) {
        gsap.from(imagem, {
          x: 40,
          opacity: 0,
          scale: 0.97,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imagem,
            start: "top 85%",
            once: true
          }
        });
      }
    });

    // Datas de beatificação e canonização
    gsap.from(".legado-datas > div", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".legado-reconhecimento",
        start: "top 80%",
        once: true
      }
    });
  }

  // ===== ORAÇÃO =====
  if (document.querySelector(".oracao")) {
    gsap.from(".oracao > *", {
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".oracao",
        start: "top 80%",
        once: true
      }
    });
  }

  // ===== RODAPÉ =====
  gsap.from("footer > *", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "footer",
      start: "top 95%",
      once: true
    }
  });

  // Atualiza os cálculos das animações
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
```;
