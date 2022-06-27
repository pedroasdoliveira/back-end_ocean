const express = require("express");
const { MongoClient, ObjectId } = require("mongodb")

const url = "mongodb://localhost:27017";
const dbName = "ocean_project";

async function main() {
  console.log("Conectando ao banco de dados...")

  const client = await MongoClient.connect(url);

  const db = client.db(dbName)

  const collection = db.collection("herois")

  const app = express();

  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  const herois = ["Mulher-Maravilha", "Superman", "Batman"];

  app.get("/herois", async function (req, res) {
    const documents = await collection.find().toArray()
    
    res.send(documents);
  });

  app.get("/herois/:id", async function (req, res) {
    const id = req.params.id;

    const item = await collection.findOne({ _id: new ObjectId(id) });

    res.send(item);
  });

  app.post("/herois", async function (req, res) {
    const item = req.body;

    await collection.insertOne(item)

    res.send(item);
  });

  app.put("/herois/:id", async function (req, res) {
    const id = req.params.id;

    const item = req.body;

    await collection.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: item
      }
    )

    res.send(item);
  });

  app.delete("/herois/:id", async function (req, res) {
    const id = req.params.id;

    await collection.deleteOne({_id: new ObjectId(id)})

    res.send("Item removido com sucesso");
  });

  app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
  );
}

main();
