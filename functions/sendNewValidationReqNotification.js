"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendNewValidationReqNotification = functions.database
  .ref("/validation/{userId}/status/{status}")
  .onWrite((snapshot, context) => {
    console.log("snapshot", snapshot);
    console.log("context", context);
    const status = snapshot.after._data;
    const userId = context.params.userId; // The display name of the user.

    //const userid = context.params.userid;
    const data = { status, userId };
    const email = gmailEmail;

    console.log("data:", data);
    console.log("status:", status);
    return status == "PENDING" && sendNewUserNotificationEmail(email, data);
  });

// Sends a notification email to the given user.
async function sendNewUserNotificationEmail(email, data) {
  const mailOptions = {
    from: email,
    to: email,
  };

  const text = `New NoP validation request:
  status: ${data.status || "<unknown status>"}    
  userId: ${data.userId || "<unknown userId>"}    
  `;

  // The user subscribed to the newsletter.
  mailOptions.subject = `New NoP signup`;
  mailOptions.text = text;
  await mailTransport.sendMail(mailOptions);
  return null;
}
