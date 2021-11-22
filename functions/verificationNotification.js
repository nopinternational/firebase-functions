"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
sgMail.setApiKey(SENDGRID_API_KEY);

exports.verificationNotification = functions.database
  .ref("/validation/{userId}/status/status/")
  .onWrite((snapshot, context) => {
    // console.log("onWrite snapshot: ", snapshot);
    // console.log("onWrite context: ", context);
    // console.log("onWrite context.auth: ", context.auth);

    const statusValue = snapshot.after._data;
    const sendEmail = statusValue != null && statusValue != "PENDING";

    if (sendEmail) {
      const userId = context.params.userId;
      //console.log("userId: ", userId);
      const emailRef = snapshot.after.ref.parent.parent
        .child("current")
        .child("email");
      //console.log("emailRef: ", emailRef);
      //const emailRef = functions.database.ref(`/validation/${userId}/current/`);
      emailRef.get("email").then((snapshot) => {
        //console.log("snapshot from emailRef: ", snapshot);
        if (snapshot.exists()) {
          const emailTo = snapshot.val();
          console.log("New notification email sent to:", emailTo);
          sendEmail && sendSendgridEmail(emailTo, { status: statusValue });
        } else {
          console.log("No data available");
        }
      });
    }
    return false;
  });

const sendSendgridEmail = (mailTo, { status }) => {
  //console.log("NOT sending to mailTo: ", mailTo);

  const mailMsg = {
    to: mailTo,
    from: {
      name: "Night of Passion",
      email: "fest@nightofpassion.se",
    },
    subject: "Night of Passion - Ang er verifiering",
    templateId: "d-c026f45b117b4a9693f97f9f952fd4e2",
    dynamicTemplateData: {
      subject: "Night of Passion - Ang er verifiering",
      status,
    },
    text: "Night of Passion - Välkommen",
    html: "<strong>Night of Passion - Välkommen</strong>",
  };
  console.log("sending mail: ", mailMsg);

  sendSgMail(mailMsg);
};

const sendSgMail = (mailMsg) => {
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
