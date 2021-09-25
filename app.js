const asteroidHelper = require("./asteroidHelper");

const express = require("express");
const morganBody = require("morgan-body");
const PORT = process.env.PORT || 5000;

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === "production" });

app
  .post("/square", (req, res) => {
    const output = parseInt(req.body.input) ** 2;
    res.json(output);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.post("/parasite", (req, res) => {
  console.log("body is", req.body[1]);
  res.sendStatus(200);
});

app.post("/asteroid", async (req, res) => {
  console.log("body is", req.body.test_cases);
  let cases = req.body.test_cases;
  let pAnswer = [];
  for (let i = 0; i < cases.length; i++) {
    pAnswer[i] = asteroidHelper.solveAsteroid(cases[i]);
  }

  const answer = await Promise.all(pAnswer);
  res.send(answer);
});
