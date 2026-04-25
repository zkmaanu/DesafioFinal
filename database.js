const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function connect() {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  // cria tabela
  await db.exec(`
    CREATE TABLE IF NOT EXISTS abrigos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      endereco TEXT,
      capacidade INTEGER,
      ocupacao INTEGER,
      comida_status TEXT,
      agua_status TEXT,
      roupa_status TEXT
    )
  `);

  // insere dados só se estiver vazio
  const abrigos = await db.all("SELECT * FROM abrigos");

  if (abrigos.length === 0) {
    await db.run(`
      INSERT INTO abrigos 
      (nome, endereco, capacidade, ocupacao, comida_status, agua_status, roupa_status)
      VALUES 
      ('Abrigo Escola', 'Rua A', 100, 50, 'ok', 'ok', 'ok'),
      ('Abrigo Igreja', 'Rua B', 80, 80, 'insuficiente', 'baixo', 'ok')
      ('Abrigo Shopping', 'Rua c', 100, 67, 'suficiente', 'insuficiente', 'ok')
    `);
  }

  return db;
}

module.exports = connect;