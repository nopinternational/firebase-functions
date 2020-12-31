/*
https://firebase.google.com/docs/functions/organize-functions

*/
const sendNewUserNotificationEmail = require("./sendNewUserNotificationEmail");

exports.sendNewUserNotificationEmail =
  sendNewUserNotificationEmail.sendNewUserNotificationEmail;
