import { onValueWritten } from "firebase-functions/database";
import { GmailConfig, sendEmail } from "../mail/gmail";
import { defineSecret } from "firebase-functions/params";
import { userLookup } from "./database";

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

// exports.sendNewValidationReqNotification = functions.database
//   .ref("/validation/{userId}/status/{status}")
//   .onWrite((snapshot, context) => {
//     // console.log("snapshot", snapshot);
//     // console.log("context", context);
//     const status = snapshot.after._data;
//     const userId = context.params.userId; // The display name of the user.

//     // const userid = context.params.userid;
//     const data = { status, userId };
//     const email = gmailEmail;

//     // console.log("data:", data);
//     // console.log("status:", status);
//     return status == "PENDING" && sendNewUserNotificationEmail(email, data);
//   });
