const express = require("express");
const connect = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // 👈 TEM QUE FICAR AQUI EM CIMA

let db;

// conectar banco e só depois iniciar servidor
connect().then(database => {
  db = database;

  // rota teste
  app.get("/", (req, res) => {
    res.send("Servidor rodando 🚀");
  });

  // listar abrigos
  app.get("/abrigos", async (req, res) => {
    const abrigos = await db.all("SELECT * FROM abrigos");
    res.json(abrigos);
  });

  // criar abrigo
  app.post("/abrigos", async (req, res) => {
    const { nome, endereco, capacidade } = req.body;

    await db.run(`
      INSERT INTO abrigos 
      (nome, endereco, capacidade, ocupacao, comida_status, agua_status, roupa_status)
      VALUES (?, ?, ?, 0, 'ok', 'ok', 'ok')
    `, [nome, endereco, capacidade]);

    res.send("Abrigo criado ✅");
  });

  // iniciar servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});