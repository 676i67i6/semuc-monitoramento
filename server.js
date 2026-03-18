const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS processos (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 nome TEXT,
 numero TEXT,
 data TEXT,
 origem TEXT,
 destino TEXT,
 status TEXT,
 descricao TEXT
)`);

// LOGIN
app.post("/login", (req, res) => {
 if (req.body.user === "admin" && req.body.pass === "1234") {
  res.json({ ok: true });
 } else {
  res.json({ ok: false });
 }
});

// LISTAR
app.get("/processos", (req, res) => {
 db.all("SELECT * FROM processos ORDER BY id DESC", [], (err, rows) => {
  res.json(rows);
 });
});

// CRIAR
app.post("/processos", (req, res) => {
 const p = req.body;
 db.run(
  `INSERT INTO processos (nome, numero, data, origem, destino, status, descricao)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [p.nome, p.numero, p.data, p.origem, p.destino, p.status, p.descricao],
  () => res.json({ ok: true })
 );
});

app.listen(3000, () => console.log("rodando"));
