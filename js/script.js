const detalhes = document.querySelectorAll("details");

function ajustarDetalhes() {
  detalhes.forEach((detalhe) => {
    if (window.innerWidth >= 600) {
      detalhe.setAttribute("open", "");
    } else {
      detalhe.removeAttribute("open");
    }
  });
}

ajustarDetalhes();
window.addEventListener("resize", ajustarDetalhes);
