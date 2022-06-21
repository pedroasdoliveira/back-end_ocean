const express = require("express");
const app = express();

app.use(express.json())

app.get("/", function (req, res) {
  res.send("Hello World");
});

const herois = ["Mulher-Maravilha", "Superman", "Batman"];

app.get("/herois", function (req, res) {
  res.send(herois.filter(Boolean));
});

app.get('/herois/:id', function (req, res) {
  const id = req.params.id;
  const item = herois[id - 1];

  res.send(item);
})

app.post("/herois", function (req, res) {
  const item = req.body.nome
  herois.push(item)

  console.log(req.body)
  res.send("Item inserido com sucesso")
});

app.put('/herois/:id', function (req, res) {
  const id = req.params.id;
  const item = req.body.nome;

  herois[id - 1] = item

  res.send("Item atualizado")
})

app.delete('/herois/:id', function (req, res) {
  const id = req.params.id;

  delete herois[id - 1]

  res.send('Item removido com sucesso')
})

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
