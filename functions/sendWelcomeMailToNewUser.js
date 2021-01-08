"use strict";
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendWelcomeMailToNewUser = functions.database
  .ref("users/{userid}")
  .onCreate(async (change, context) => {
    console.log("============ DEBUG ============");
    console.log("change: ", change);
    console.log("context: ", context);
    console.log("============ DEBUG ============");
    const emailTo = "sthlmpar08@gmail.com"; // change to email from change obj
    sendSendgridEmail(emailTo);
    console.log("New welcome email sent to:", emailTo);
    return null;
  });

const sendSendgridEmail = (mailTo) => {
  const mailMsg = {
    to: mailTo,
    from: {
      name: "Night of Passion",
      email: "fest@nightofpassion.se",
    },
    subject: "Night of Passion - Välkommen",
    templateId: "d-523995bb8beb4086bb72e91f95005e98",
    text: "Night of Passion - Välkommen",
    html: "<strong>Night of Passion - Välkommen</strong>",
  };
  console.log(mailMsg);

  sgMail.send(mailMsg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
