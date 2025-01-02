import { auth } from "firebase-functions/v1";
import { defineString } from "firebase-functions/params";
import { init, updateSgContact } from "../lib/mail/sendgrid";


// Should be a secret but genv1 cannot handle secrets, need to be included into dependency array
const sendgridAPIKey = defineString("SENDGRID_CONTACTS_APIKEY");
const sendgridNopListId = defineString("SENDGRID_NOP_LISTID");


export const newUserAuth = auth.user().onCreate((user) => {
  console.log("UserCreated", user);
  console.log("UserCreated.email", user.email);

  if (user.email) {
    onNewUserCreated(user.email);
  }
});

const onNewUserCreated = (email: string) => {
  console.log(sendgridAPIKey.value(), sendgridNopListId.value());
  const listId = sendgridNopListId.value();
  init(sendgridAPIKey.value());
  updateSgContact(email, listId);
};

