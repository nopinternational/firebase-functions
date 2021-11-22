/*
https://firebase.google.com/docs/functions/organize-functions

*/

exports.sendNewUserNotificationEmail =
  require("./sendNewUserNotificationEmail").sendNewUserNotificationEmail;

exports.sendWelcomeMailToNewUser =
  require("./sendWelcomeMailToNewUser").sendWelcomeMailToNewUser;

exports.sendNewAuthUserNotification =
  require("./sendNewAuthUserNotification").sendNewAuthUserNotification;

exports.sendNewValidationReqNotification =
  require("./sendNewValidationReqNotification").sendNewValidationReqNotification;

exports.verificationNotification =
  require("./verificationNotification").verificationNotification;
