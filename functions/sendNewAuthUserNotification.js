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

exports.sendNewAuthUserNotification = functions.auth.user().onCreate((user) => {
  console.log("new user created: ", user);
  const useremail = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  //const userid = context.params.userid;
  const data = { useremail, displayName, uid: user.uid };
  const email = gmailEmail;

  return sendNewUserNotificationEmail(email, data);
});

// Sends a notification email to the given user.
async function sendNewUserNotificationEmail(email, data) {
  const mailOptions = {
    from: email,
    to: email,
  };

  const text = `New NoP signup:
  user: ${data.useremail || "<unknown user>"}    
  name: ${data.displayName || "<unknown name>"}    
  uid: ${data.uid || "<unknown uid>"}    
  `;

  // The user subscribed to the newsletter.
  mailOptions.subject = `New NoP auth`;
  mailOptions.text = text;
  await mailTransport.sendMail(mailOptions);
  return null;
}
