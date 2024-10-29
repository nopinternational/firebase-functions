import {onValueCreated} from "firebase-functions/database";
import {logger   } from "firebase-functions/v2";
// import { initializeApp } from "firebase-admin/app";
// initializeApp();
// import { onRequest } from "firebase-functions/https";
// const { onRequest } = require("firebase-functions/v2/https");
// const { onValueCreated } = require("firebase-functions/v2/database");
// const { logger } = require("firebase-functions");

// exports.sendNewUserNotificationEmail = functions.database
//   .ref("users/{userid}")
//   .onCreate(async (change, context) => {
//     const userid = context.params.userid;
//     const data = change._data;
//     const email = gmailEmail;

//     console.log();
//     //return sendNewUserNotificationEmail(email, data);
//   });

export const sendNewUserNotificationEmail = onValueCreated("/users/{userId}", (event) => {
  // …
  const original = event.data.val();
  logger.debug("newUser.ts - Uppercasing", event.params.userId, original);
  //   const uppercase = original.toUpperCase();
  console.log("newUser.ts - event.params.userId: ", event.params.userId);
  logger.debug("newUser.ts - event.params.userId: ", event.params.userId);
});

