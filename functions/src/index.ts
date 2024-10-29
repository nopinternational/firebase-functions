/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onValueCreated } from "firebase-functions/database";
// import { logger } from "firebase-functions/v2";

import { initializeApp } from "firebase-admin/app";
initializeApp();

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const {initializeApp} = require("firebase-admin/app");
// const {getFirestore} = require("firebase-admin/firestore");


// const in = require("firebase-admin");
// admin.initializeApp();

// exports.userscreated = onValueCreated("/users/{userId}", (event) => {
//   // …
//     const original = event.data.val()
//   logger.debug("Uppercasing", event.params.userId, original);
// //   const uppercase = original.toUpperCase();
//   console.log("event.params.userId: ", event.params.userId)
//   logger.debug("event.params.userId: ", event.params.userId)
// });

// logger.error("HELLO")

// exports.makeuppercase = onValueCreated(
//     "/messages/{pushId}/original",
//     (event) => {
//     // Grab the current value of what was written to the Realtime Database.
//       const original = event.data.val();
//       logger.log("makeuppercase", event.params.pushId, original);
//       const uppercase = original.toUpperCase();
//       // You must return a Promise when performing
//       // asynchronous tasks inside a function, such as
//       // writing to the Firebase Realtime Database.
//       // Setting an "uppercase" sibling in the
//       // Realtime Database returns a Promise.
//       return event.data.ref.parent?.child("uppercase").set(uppercase);
//     },
// );

// const newUser = require('./admin-functions/newUser');
// exports.newUser=newUser.sendNewUserNotificationEmail;

import { sendNewUserNotificationEmail } from "./admin-functions/newUser";
export const foo = sendNewUserNotificationEmail