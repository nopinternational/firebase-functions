import { onValueCreated } from "firebase-functions/database";
import { GmailConfig, sendEmail } from "../lib/mail/gmail";
import { defineSecret } from "firebase-functions/params";

// Define the secret parameter
const gEmail = defineSecret("GMAIL_EMAIL");
const gPass = defineSecret("GMAIL_PASSWORD");


type Userdata = {
  email: string
  username: string
  message: string
}

const sendNewUserNotificationEmail = onValueCreated({ ref: "/users/{userId}", secrets: [gEmail, gPass] }, (event) => {
  const original = event.data.val();
  const userdata = { ...original };
  const userId = event.params.userId;

  onNewUser(userId, userdata);
});

const onNewUser = (userId: string, userdata: Userdata) => {
  console.log("notifyNewUser: ", userId, userdata);

  const gmailConfig: GmailConfig = {
    email: gEmail.value(),
    password: gPass.value(),
  };

  const to = "fest@nightofpassion.se";

  const mailContent = onNewUserEmailTemplate(userdata);
  return sendEmail(gmailConfig, to, "New NoP signup", mailContent);
};

type NewUserSignup = {
  username: string,
  message: string
}

const onNewUserEmailTemplate = (data: NewUserSignup): string => {
  const text = `New NoP signup:
user: ${data.username || "<unknown user>"}    
message: ${data.message || "<unknown msg>"}     
`;
  return text;
};

export { sendNewUserNotificationEmail };
