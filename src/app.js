const express = require("express");

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/v1/info", (req, res) => {
  res.status(200).json({
    name: "devsecops-cicd-platform",
    version: process.env.npm_package_version || "1.0.0",
  });
});

module.exports = app;