import React from 'react';
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import serialize from 'serialize-javascript';
import { matchPath, StaticRouter } from 'react-router-dom';
import routes from '../shared/routes';

const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('*', (req, res, next) => {
  let activeRoute = routes.find(route => matchPath(req.url, route)) || {};

  let promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then(data => {
      const context = { data };

      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(`
        <!doctype html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>React Router Server-Side-Rendering</title>
              <link rel="shortcut icon" href="#" />
            </head>
            <body>
              <div id="app">${markup}</div>
              <script src='/bundle.js'></script>
              <script>window.InitialData = ${serialize(data)}</script>
            </body>
          </html>
          `);
    })
    .catch(next);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
