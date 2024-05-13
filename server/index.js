/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret =
  "7yxmekbjc4h4w7x7pjfntkyfc24myjja22k4fsx6xm9mz6phe5vqu6jbd5bnd7a5";
app.use(cors());
app.use(express.json());

app.post("/token", async (req, res) => {
  if (req.body.token) {
    res.json({ token: req.body.token });
    return;
  }
  const issuedAt = Math.floor(Date.now() / 1000) - 60;
  const token = jwt.sign({ iat: issuedAt, user_id: req.body.id }, secret, {
    algorithm: "HS256",
  });
  res.json({ token });
});

app.listen(3000, () => {
  console.log("This server is running on port 3000");
});
