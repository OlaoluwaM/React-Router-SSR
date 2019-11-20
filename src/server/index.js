import React from "react";
import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import App from "../shared/App";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const markup = renderToString(<App data="Mustapha" />);

  res.send(`
  <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>React Router Server-Side-Rendering</title>
      </head>
      <body>
        <div id="app">${markup}</div>
        <script src='/bundle.js'></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
