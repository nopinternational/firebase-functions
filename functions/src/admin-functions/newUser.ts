import { onValueCreated } from "firebase-functions/database";
import { sendEmail } from "../mail/gmail";

const sendNewUserNotificationEmail = onValueCreated("/users/{userId}", (event) => {
  // …

  const to = "fest@nightofpassion.se";
  const original = event.data.val();
  console.log("newUser.ts - event.data ", event.data.val());
  console.log("newUser.ts - event.data ", event.data.toJSON());
  // logger.debug("newUser.ts - event.params.userId: ", event.params.userId);
  console.log("HELLO new user")
  return sendEmail(to, { username: original.name, message: "a new user" })
});

export { sendNewUserNotificationEmail };
