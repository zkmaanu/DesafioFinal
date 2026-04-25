console.log("script carregado");

async function carregarAbrigos() {
  console.log("botão clicado");

  try {
    const response = await fetch("/abrigos"); 
    
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const abrigos = await response.json();

    const div = document.getElementById("lista");
    div.innerHTML = "";

    if (abrigos.length === 0) {
      div.innerHTML = "<p>Nenhum abrigo cadastrado.</p>";
      return;
    }

    abrigos.forEach(a => {

      let alerta = "";

      if (a.comida_status === "falta" || a.agua_status === "falta") {
        alerta = " Precisa de doação!";
      } 
      else if (a.comida_status === "baixo" || a.agua_status === "baixo") {
        alerta = " Estoque baixo";
      }

      div.innerHTML += `
        <div style="border:1px solid black; margin:10px; padding:10px; border-radius:8px;">
          <h3>${a.nome}</h3>
          <p> Comida: ${a.comida_status}</p>
          <p> Água: ${a.agua_status}</p>
          <p> Vagas: ${a.ocupacao}/${a.capacidade}</p>
          <p style="color:red; font-weight:bold;">${alerta}</p>
        </div>
      `;
    });

  } catch (erro) {
    console.error("ERRO:", erro);
    document.getElementById("lista").innerHTML = 
      "<p style='color:red;'>Erro ao carregar abrigos 😢</p>";
  }
}