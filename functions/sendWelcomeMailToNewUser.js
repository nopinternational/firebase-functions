"use strict";
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendWelcomeMailToNewUser = functions.database
  .ref("users/{userid}")
  .onCreate(async (change, context) => {
    const emailTo = change._data.email;
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
