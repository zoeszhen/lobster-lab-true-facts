import 'zone.js/dist/zone-node';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { renderModuleFactory } from '@angular/platform-server';
import * as fs from 'fs';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const path = require('path');
const document = fs.readFileSync(
  path.join(__dirname, '..', 'dist-server', 'index.html'),
  'utf8'
);
const AppServerModuleNgFactory = require(path.join(
  __dirname,
  '..',
  'dist-server',
  'main.js'
)).AppServerModuleNgFactory;

const app = express();
app.get('**', (req, res) => {
  const url = req.path;
  renderModuleFactory(AppServerModuleNgFactory, { document, url }).then(
    (html) => {
      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
      res.send(html);
    }
  );
});

export let ssrapp = functions.https.onRequest(app);
