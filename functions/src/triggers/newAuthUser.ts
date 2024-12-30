import { auth } from "firebase-functions/v1";
import { defineSecret, defineString } from "firebase-functions/params";
import { init, updateSgContact } from "../lib/mail/sendgrid";

const sendgridAPIKey = defineSecret("SENDGRID_API_KEY");
const sendgridNopListId = defineString("SENDGRID_NOP_LISTID");


export const newUserAuth = auth.user().onCreate((user) => {
  // ...
  // const gmailEmail = paramGEmail.value();
  // const gmailPassword = paramGPassword.value();
  // console.log("beforeUserCreated", event.data?.uid, gEmail.value());
  console.log("UserCreated", user);
  console.log("UserCreated.email", user.email);
  // console.log(gmailEmail, gmailPassword);

  if (user.email) {
    onNewUserCreated(user.email);
  }
});

// export const newUserAuthDatabase =
//   onValueWritten({ ref: "/validation/{userId}/current/email", secrets: [sendgridAPIKey] }, (event) => {
//     console.log("newStatusNotifyUser", event);
//     console.log("event.params.userId", event.params.userId);
//     console.log("-----event.data.before.val()", event.data.before.val());
//     console.log("+++++event.data.after.val()", event.data.after.val());
//     // onNewUserCreated(event.data.after.val());
//   });

const onNewUserCreated = (email: string) => {
  console.log(sendgridAPIKey.value(), sendgridNopListId.value());
  const listId = sendgridNopListId.value();
  init(sendgridAPIKey.value());
  updateSgContact(email, listId);
};

