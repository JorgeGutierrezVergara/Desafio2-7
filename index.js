const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.listen(3000, console.log("¡Servidor encendido!"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/canciones", (req, res) => {
  const nuevaCancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  repertorio.push(nuevaCancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Cancion agregada");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(canciones);
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancionEditada = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((p) => p.id == id);
  repertorio[index] = cancionEditada;
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Repertorio modificado con éxito");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((p) => p.id == id);
  repertorio.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Canción eliminada con éxito");
});
