import { onValueCreated } from "firebase-functions/database";
import { sendEmail } from "../mail/gmail";


type Userdata = {
  email: string
  username: string
  message: string
}

const sendNewUserNotificationEmail = onValueCreated("/users/{userId}", (event) => {
  // …


  const to = "fest@nightofpassion.se";
  const original = event.data.val();

  const userdata = { ...original }
  const userId = event.params.userId

  console.log("newUser.ts - event.data ", event.data.val());
  console.log("newUser.ts - userId ", userId);
  console.log("newUser.ts - userdata ", userdata);
  // logger.debug("newUser.ts - event.params.userId: ", event.params.userId);
  console.log("HELLO new user")
  onNewUser(userId, userdata)
});

const onNewUser = (userId: string, userdata: Userdata) => {
  console.log("notifyNewUser: ", userId, userdata)
  // return sendEmail(to, { username: original.name, message: "a new user" })
}


export { sendNewUserNotificationEmail };
