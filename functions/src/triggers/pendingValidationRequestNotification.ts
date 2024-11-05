import { onValueWritten } from "firebase-functions/database";
import { GmailConfig, sendEmail } from "../lib/mail/gmail";
import { defineSecret } from "firebase-functions/params";
import { userLookup } from "../lib/database";

// Define the secret parameter
const gEmail = defineSecret("GMAIL_EMAIL");
const gPass = defineSecret("GMAIL_PASSWORD");


type Userdata = {
  status: string

}

export const sendPendingValidationRequest =
  onValueWritten({ ref: "/validation/{userId}/status/", secrets: [gEmail, gPass] }, (event) => {
    console.log("before", event.data.before.val());
    console.log("after", event.data.after.val());
    const original = event.data.after.val();
    const userdata = { ...original } as Userdata;
    const userId = event.params.userId;
    console.log("userdata: ", userdata);

    if (userdata.status == "PENDING") {
      onPendingValidationRequest(userId, userdata);
    } else {
      console.log("status ignored:", userdata.status);
    }
  });

const onPendingValidationRequest = async (userId: string) => {
  const gmailConfig: GmailConfig = {
    email: gEmail.value(),
    password: gPass.value(),
  };
  const usernameEventually = await userLookup(userId);

  const mailContent = onNewUserEmailTemplate({ userId, username: usernameEventually });
  const to = "fest@nightofpassion.se";
  return sendEmail(gmailConfig, to, "New NoP validation request", mailContent);
};

type EmailTemplateData = {
  username?: string,
  userId: string
}

const onNewUserEmailTemplate = (data: EmailTemplateData): string => {
  const text = `New NoP validation request, PENDING:
  username: ${data.username || "<unknown userId>"}    
  userId: ${data.userId || "<unknown userId>"}
  
  https://nop-admin.vercel.app/user/${data.userId}
  `;
  return text;
};

