import * as functions from 'firebase-functions';
const path = require('path');
const mainjsFile = require(path.join(__dirname, '../server/main'));
exports.ngssr = functions.https.onRequest(mainjsFile.app());

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
